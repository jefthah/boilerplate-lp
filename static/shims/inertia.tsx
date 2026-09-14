import { Children, isValidElement, useEffect } from 'react';
import type { ReactNode } from 'react';

type HeadProps = {
    children?: ReactNode;
    title?: string;
};

type MetaProps = {
    content?: string;
    name?: string;
};

export function Head({ children, title }: HeadProps) {
    const description = Children.toArray(children).find(
        (child) =>
            isValidElement<MetaProps>(child) &&
            child.type === 'meta' &&
            child.props.name === 'description',
    );
    const descriptionContent = isValidElement<MetaProps>(description)
        ? description.props.content
        : undefined;

    useEffect(() => {
        if (title) {
            document.title = title;
        }

        if (!descriptionContent) {
            return;
        }

        let descriptionMeta = document.querySelector<HTMLMetaElement>(
            'meta[name="description"]',
        );

        if (!descriptionMeta) {
            descriptionMeta = document.createElement('meta');
            descriptionMeta.name = 'description';
            document.head.append(descriptionMeta);
        }

        descriptionMeta.content = descriptionContent;
    }, [descriptionContent, title]);

    return null;
}
