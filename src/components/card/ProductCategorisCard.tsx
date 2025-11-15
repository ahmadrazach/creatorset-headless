/* eslint-disable camelcase */
import { Text, Group } from "@mantine/core";
import Image from "next/image";
import useStyles from "./styles";
import { ProfileProps } from "../../../common/types";

export default function ProductCategorisCard({ userDetails }: ProfileProps) {
    const {
        bio,
        displayName,
        picture_url,
        socialMedia,
        verified,
        display_name,
    } = userDetails;
    const { classes } = useStyles();
    return (
        <div>
            <Group noWrap>
                <div className={classes.ProdCatAvatar}>
                    <Image
                        src={
                            picture_url
                                ? `${picture_url}`
                                : "/images/productCategorisAvatar.svg"
                        }
                        className="rounded-md"
                        height={168.75}
                        width={168.75}
                        alt="image"
                    />
                </div>

                <div>
                    <Group noWrap spacing={10}>
                        <Text className={classes.ProdCatTitle}>
                            {display_name || displayName}
                        </Text>
                        {verified && (
                            <Image
                                src="/images/blueTick.svg"
                                height={20}
                                width={20}
                                alt="image"
                                style={{ marginTop: "-10px" }}
                            />
                        )}
                    </Group>

                    <Text className={classes.ProdCatDescription}>{bio}</Text>

                    <Group noWrap spacing={10}>
                        <Image
                            src="/images/twitter1.svg"
                            height={14}
                            width={15}
                            alt="image"
                            style={{ marginTop: "-10px" }}
                        />
                        <Text className={classes.ProdCatTwitterTxt}>
                            {socialMedia ? socialMedia[0].url : "CreatorSet"}
                        </Text>
                    </Group>

                    <Group noWrap spacing={10}>
                        <Image
                            src="/images/downloadButton.svg"
                            height={14}
                            width={15}
                            alt="image"
                            style={{ marginTop: "-10px" }}
                        />
                        <Text className={classes.ProdCatDownloadTxt}>322</Text>
                    </Group>
                </div>
            </Group>
        </div>
    );
}
