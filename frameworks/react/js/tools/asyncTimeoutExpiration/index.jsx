// hooks/useDateExpirationCheck.js
import { useEffect, useState } from "react";

/**
 * Custom hook for checking expiration (simple version).
 *
 * @param {number|string|Date} timeStamp - The original timestamp (ms since epoch or parsable date string).
 * @param {number} timeCheckInSeconds - How long until expiration, in seconds.
 *
 * @returns {Object} { expired: boolean }
 *
 * Usage:
 * const { expired } = useSimpleDateExpirationCheck(wallet?.updatedAt, 300);
 * console.log(expired); // true if expired, false if still valid
 * 
 * similarly
 * 
 * // Simple check (snapshot + auto-update, no callback)
 * const { expired } = useSimpleDateExpirationCheck(wallet?.updatedAt, 300);
 */
export const useSimpleDateExpirationCheck = (timeStamp = 0, timeCheckInSeconds = 0) => {
    // Holds whether the timestamp is expired (true/false)
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        // If no valid timestamp or check value, default to not expired
        if (!timeStamp || !timeCheckInSeconds) {
            setExpired(false);
            return;
        }

        // Convert timestamp to a Date object for calculations
        const timeStampValue = new Date(timeStamp);
        // Current system time
        const now = new Date();

        // Difference in milliseconds between now and timestamp
        const diffMs = now - timeStampValue;
        
        // Convert difference to seconds
        const diffSeconds = diffMs / 1000;

        // Check if expired right now
        const isExpired = diffSeconds > timeCheckInSeconds;
        setExpired(isExpired);

        // If not expired yet, schedule a timer for expiration
        if (!isExpired) {
            const remainingMs = (timeCheckInSeconds * 1000) - diffMs;

            const timer = setTimeout(() => {
                setExpired(true);
            }, remainingMs);

            // Cleanup timer if dependencies change or component unmounts
            return () => clearTimeout(timer);
        }
    }, [timeStamp, timeCheckInSeconds]);

    return { expired };
};

/**
 * Custom hook for checking expiration (extended version with optional callback).
 *
 * @param {number|string|Date} timeStamp - The original timestamp (ms since epoch or parsable date string).
 * @param {number} timeCheckInSeconds - How long until expiration, in seconds.
 * @param {function} [onExpire] - Optional callback, fires automatically when expiration is reached.
 *
 * @returns {Object} { expired: boolean }
 *
 * Usage:
 * const { expired } = useDateExpirationCheck(wallet?.updatedAt, 300, () => {
 *   console.log("Wallet pin expired, request new pin!");
 * });
 *
 * or(similarly)
 *
 * // Extended check (snapshot + auto-update + callback at expiration)
 * const { expired } = useDateExpirationCheck(wallet?.updatedAt, 300, () => {
 * console.log("Wallet pin expired, auto-sync triggered!");
});
 */
export const useDateExpirationCheck = (timeStamp = 0, timeCheckInSeconds = 0, onExpire) => {
    // Holds whether the timestamp is expired (true/false)
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        // If no valid timestamp or check value, default to not expired
        if (!timeStamp || !timeCheckInSeconds) {
            setExpired(false);
            return;
        }

        // Convert timestamp to a Date object for calculations
        const timeStampValue = new Date(timeStamp);
        // Current system time
        const now = new Date();

        // Difference in milliseconds between now and timestamp
        const diffMs = now - timeStampValue;
        // Convert difference to seconds
        const diffSeconds = diffMs / 1000;

        // Check if expired right now
        const isExpired = diffSeconds > timeCheckInSeconds;
        setExpired(isExpired);

        // If already expired, trigger callback immediately
        if (isExpired) {
            if (typeof onExpire === "function") {
                onExpire();
            }
            return;
        }

        // Otherwise, calculate remaining time until expiration in ms
        const remainingMs = (timeCheckInSeconds * 1000) - diffMs;

        // Schedule a timer to mark as expired when the time passes
        const timer = setTimeout(() => {
            setExpired(true);
            if (typeof onExpire === "function") {
                onExpire();
            }
        }, remainingMs);

        // Cleanup timer if dependencies change or component unmounts
        return () => clearTimeout(timer);

    }, [timeStamp, timeCheckInSeconds, onExpire]);

    return { expired };
};
