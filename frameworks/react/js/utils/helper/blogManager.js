import { differenceInCalendarDays, differenceInMonths, differenceInYears, endOfWeek, format, isToday, isYesterday, startOfWeek } from "date-fns";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const handleBlogViews = (dataViews) => {
    let views = 0;

    // console.log(dataViews)
    if (dataViews) {
        views += dataViews
    }

    return views;
};

const handleBlogReactions = (dataViews) => {
    let views = 0;

    // console.log(dataViews)
    if (dataViews) {
        views += dataViews
    }

    return views;
};

const formatViewsDisplay = (views) => {
    if (views >= 1_000_000_000) {
        return `${Math.floor(views / 1_000_000_000)}b+`;
    } else if (views >= 1_000_000) {
        return `${Math.floor(views / 1_000_000)}m+`;
    } else if (views >= 1_000) {
        return `${Math.floor(views / 1_000)}k+`;
    }
    return `${views}`;
};

const getBlogComments = (activity) => {
    if (!Array.isArray(activity)) return 0; // Validate activity as an array
    return activity.filter(ele => ele?.comment?.trim().length > 0).length;
};


const getBlogDateLabel = (date) => {

    const blogDate = new Date(date);

    if (isNaN(blogDate.getTime())) {
        return '' // Return a fallback if the date is invalid
    }

    // Get the start and end of the current week (Sunday to Saturday)
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday as start of the week
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });     // Saturday as end of the week


    // formally : differenceInCalendarDays(new Date(), messageDate) <= 7
    if (isToday(blogDate)) {
        return "Today";
    } else if (isYesterday(blogDate)) {
        return "Yesterday";
    } else if (blogDate >= startOfCurrentWeek && blogDate <= endOfCurrentWeek) {
        return format(blogDate, 'EEEE'); // Returns the day of the week (e.g., "Monday")
    } else {
        const now = new Date();
        const yearDifference = differenceInYears(now, blogDate);
        const monthDifference = differenceInMonths(now, blogDate);

        if (yearDifference >= 1) {
            return yearDifference === 1 ? "A year ago" : `${yearDifference} years ago`;
        } else if (monthDifference >= 1) {
            const play = formatViewsDisplay()
            return monthDifference === 1 ? "A month ago" : `${monthDifference} months ago`;
        } else {
            const dayDifference = differenceInCalendarDays(now, blogDate);
            return `${dayDifference} days ago`;
        }
    }
}

const useGetCheckUser = (item) => {
    const { userInfo } = useSelector((state) => state.auth);

    // Memoize the user interaction checks
    const { userLiked, userViewed } = useMemo(() => {
        if (!item?.activity || item.activity.length === 0) {
            return { userLiked: false, userViewed: false };
        }

        let liked = false;
        let viewed = false;
        
        console.log(item?.activity)
        for (const activity of item?.activity) {
            console.log(activity?.user?.id)
            console.log(userInfo?.id)
            if (activity?.user?.id === userInfo?.id) {
                if (activity?.feel_status === "like") liked = true;
                if (activity?.views) viewed = true;

                // Break early if both conditions are met
                if (liked && viewed) break;
            }
        }

        return { userLiked: liked, userViewed: viewed };
    }, [item, userInfo]);

    return { userLiked, userViewed };
};

const getBlogLatest = (date) => {

    const blogDate = new Date(date);

    if (isNaN(blogDate.getTime())) {
        return '' // Return a fallback if the date is invalid
    }

    // Get the start and end of the current week (Sunday to Saturday)
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday as start of the week
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });     // Saturday as end of the week

    // console.log(startOfCurrentWeek)
    // console.log(endOfCurrentWeek)
    // formally : differenceInCalendarDays(new Date(), messageDate) <= 7
    if (isToday(blogDate)) {
        return true
    } else if (isYesterday(blogDate)) {
        return true
    } else if (blogDate >= startOfCurrentWeek && blogDate <= endOfCurrentWeek) {
        return true // Returns the day of the week (e.g., "Monday")
    } else {
        return false
    }
}

// In use(for latest blog)
// const useTopViewedBlogs = (dataItems, responsiveFilteredData) => {
const useViewedAndLikedBlogs = (dataItems,) => {
    const topViewedBlogs = useMemo(() => {
        if (!dataItems || !Array.isArray(dataItems)) return [];

        // Aggregate blogs with their total views
        const blogViews = dataItems.map((item) => {
            const totalViews = item.activity?.filter((act) => act.views).length || 0;
            const mostLiked = item.activity?.filter((act) => act.feel_status === 'like').length || 0;
            // const mostDisliked = item.activity?.filter((act) => act.feel_status === 'dislike').length || 0;
            const mostReacted = item.activity?.filter((act) => act.feel_status !== 'default').length || 0;

            // console.log(blogViews)
            return {
                ...item,
                totalViews,
                mostLiked,
                // mostDisliked,
                mostReacted
            };
        });

        console.log(blogViews);
        // Filter top 20 most viewed blogs
        // const top20Blogs = blogViews.slice(0, 20);
        // console.log(top20Blogs)

        // Append other blogs, excluding the top 20
        // const remainingBlogs = blogViews.slice(20);
        // console.log(remainingBlogs)
        return [...blogViews];
    }, [dataItems]);
    return topViewedBlogs
};

// const useTopViewedBlogs = (dataItems, responsiveFilteredData) => {
const useTopViewedBlogs = (dataItems,) => {
    const topViewedBlogs = useMemo(() => {
        if (!dataItems || !Array.isArray(dataItems)) return [];

        // Aggregate blogs with their total views
        const blogViews = dataItems.map((item) => {
            const totalViews = item.activity?.filter((act) => act.views).length || 0;
            const mostLiked = item.activity?.filter((act) => act.feel_status === 'like').length || 0;
            const mostDisliked = item.activity?.filter((act) => act.feel_status === 'dislike').length || 0;
            const mostReacted = item.activity?.filter((act) => act.feel_status !== 'default').length || 0;

            // console.log(blogViews)
            return {
                ...item,
                totalViews,
                mostLiked,
                mostDisliked,
                mostReacted
            };
        });
        // console.log(blogViews);
        // Sort blogs by views in descending order
        blogViews.sort((a, b) => b.totalViews - a.totalViews);

        // console.log(blogViews);
        // Filter top 20 most viewed blogs
        const top20Blogs = blogViews.slice(0, 20);
        // console.log(top20Blogs)

        // Append other blogs, excluding the top 20
        const remainingBlogs = blogViews.slice(20);
        // console.log(remainingBlogs)
        return [...top20Blogs, ...remainingBlogs];
    }, [dataItems]);

    return topViewedBlogs
};

// In use(for popular blogs)
// const useTopViewedBlogs = (dataItems, responsiveFilteredData) => {
const useShowTopViewedBlogs = (dataItems,) => {
    const topViewedBlogs = useMemo(() => {
        if (!dataItems || !Array.isArray(dataItems)) return [];

        // Aggregate blogs with their total views
        const blogViews = dataItems.map((item) => {
            const totalViews = item.activity?.filter((act) => act.views).length || 0;
            const mostLiked = item.activity?.filter((act) => act.feel_status === 'like').length || 0;
            const mostDisliked = item.activity?.filter((act) => act.feel_status === 'dislike').length || 0;
            const mostReacted = item.activity?.filter((act) => act.feel_status !== 'default').length || 0;

            // console.log(blogViews)
            return {
                ...item,
                totalViews,
                mostLiked,
                mostDisliked,
                mostReacted
            };
        });
        // console.log(blogViews);
        // Sort blogs by views in descending order
        blogViews.sort((a, b) => b.totalViews - a.totalViews);

        // console.log(blogViews)
        // Sort blogs by likes in descending order
        blogViews.sort((a, b) => b.mostReacted - a.mostReacted);
        // console.log(blogViews)

        const mostReacted = blogViews.filter((act) => act?.totalViews > 0 && act);

        return [...mostReacted]
    }, [dataItems]);

    // console.log(topViewedBlogs)
    return topViewedBlogs
};

export { handleBlogViews, handleBlogReactions, formatViewsDisplay, getBlogDateLabel, useViewedAndLikedBlogs, useTopViewedBlogs, useShowTopViewedBlogs, getBlogLatest, useGetCheckUser, getBlogComments };
