import React from "react";
import { cn } from "../../lib/utils";

const Table = React.forwardRef(
  ({ className, scrollable = false, height = "400px", minW = "600px", children, ...props }, ref) => {
    if (scrollable) {
      const header = React.Children.toArray(children).find(
        (child) => child.type.displayName === "TableHeader"
      );
      const body = React.Children.toArray(children).find(
        (child) => child.type.displayName === "TableBody"
      );
      const footer = React.Children.toArray(children).find(
        (child) => child.type.displayName === "TableFooter"
      );

      return (
        <div className="relative w-full overflow-x-auto z-10">
          {/* Header Table */}
          <table
            ref={ref}
            className={cn(`w-full min-w-[600px] table-fixed caption-bottom text-base md:text-lg pr-1.5`, className)}
            {...props}
          >
            {header}
          </table>

          {/* Scrollable Body */}
          <div
            className="w-full min-w-[600px] overflow-x-hidden z-20 overflow-y-auto"
            style={{ minHeight: "200px", maxHeight: height }}
          >
            <table className="w-full table-fixed caption-bottom text-sm">
              {body}
            </table>
          </div>

          {/* Optional Footer */}
          {footer && (
            <table className="w-full min-w-[600px] table-fixed caption-bottom text-base md:text-lg">
              {footer}
            </table>
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm", className)}
          style={{ minHeight: "200px", maxHeight: height }}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b border-border", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, hover = true, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      `border-b border-border transition-colors cursor-pointer ${
        hover ? "hover:bg-muted/50 data-[state=selected]:bg-muted" : ""
      }`,
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium bg-muted text-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle text-sm md:text-lg text-foreground [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };