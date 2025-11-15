import { Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function CardSkeleton() {
    const matches = useMediaQuery("(max-width: 720px)");
    return (
        <div className="mb-5 w-full">
            <Skeleton height={matches ? 160 : 300} radius="md" mb="sm" />

            <div style={{ display: "flex" }}>
                <Skeleton height={50} mt={2} mb={5} circle radius="50%" />
                <div>
                    <Skeleton
                        height={15}
                        ml={10}
                        mt={10}
                        width="250px"
                        radius="xl"
                    />
                    <Skeleton height={8} ml={10} mt={6} radius="xl" />
                    <Skeleton height={8} ml={10} mt={6} radius="xl" />
                    <Skeleton height={8} ml={10} mt={6} radius="xl" />
                </div>
            </div>
        </div>
    );
}

export default CardSkeleton;
