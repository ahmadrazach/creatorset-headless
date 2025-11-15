import { Button, Container, ScrollArea } from "@mantine/core";
import useStyles from "./styles";

function CartTopLinks() {
    const { classes } = useStyles();
    return (
        <ScrollArea type="never">
            <Container className={classes.container}>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">All Products</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Bundles</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Social</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Assets</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Genres</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Software</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Action</div>
                </Button>
                <Button className={`${classes.button} ${classes.Linkh6}`}>
                    <div className="pt-2">Gaming</div>
                </Button>
            </Container>
        </ScrollArea>
    );
}

export default CartTopLinks;
