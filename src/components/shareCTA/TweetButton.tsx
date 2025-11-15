/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/function-component-definition */
import { Button, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import {
    MAX_TWEET_LENGTH,
    TWITTER_INTENT_URL,
    TWITTER_SHORT_URL_LENGTH,
} from "../../../common/constants";

type Props = {
    title: string;
    url: string;
    tags: string[];
};

export const getTwitterHref = ({ url, title }: Props) => {
    const shareUrl = new URL(TWITTER_INTENT_URL);
    const search = new URLSearchParams({
        url,
        text: title,
    }).toString();

    const urlLengthDiff =
        url.length - Math.min(url.length, TWITTER_SHORT_URL_LENGTH);

    if (search.length - Math.max(urlLengthDiff, 0) > MAX_TWEET_LENGTH) {
        throw new Error(
            `Sharing "${title}" results in a tweet that is too long`
        );
    }

    shareUrl.search = search;

    return shareUrl.href;
};

const TweetButton: FC<Props> = props => {
    const theme = useMantineTheme();
    return (
        <Link href={getTwitterHref(props)}>
            <Button
                style={{
                    marginLeft: "-1.25rem",
                    color:
                        theme.colorScheme === "dark" ? "#C1C2C5" : theme.black,
                }}
            >
                Twitter
            </Button>
        </Link>
    );
};

export default TweetButton;
