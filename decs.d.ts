declare module 'react-masonry-css' {

    import * as React from 'react';

    export interface MasonryProps {
        breakpointCols: any;
        className: any;
        columnClassName: any;
        children?: React.ReactNode;
        component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    }

    export default function Masonry(props: MasonryProps): JSX.Element;
}
