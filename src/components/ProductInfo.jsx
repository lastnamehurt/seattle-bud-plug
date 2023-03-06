import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Modal,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '600px',
        maxHeight: '80%',
        overflow: 'auto',
        padding: theme.spacing(3),
    },
    productImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        marginBottom: theme.spacing(2),
    },
    productInfo: {
        marginBottom: theme.spacing(2),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: theme.spacing(2),
    },
}));

const ProductInfoPopup = ({ product, onClose }) => {
    const classes = useStyles();

    const handleOrderNowClick = () => {
        window.open(product.url, "_blank");
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            className={classes.modalContainer}
        >
            <Card className={classes.modalContent}>
                <CardMedia
                    component="img"
                    alt={product.name}
                    // image={product.image}
                    image="https://olla-product-images.s3.us-west-1.amazonaws.com/airoWAairopodgenericvaporcartridge.jpg"
                    className={classes.productImage}
                />
                <CardContent className={classes.productInfo}>
                    <Typography variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.brand}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.category}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.description}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.thc_percentage} THC
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.cbd_percentage} CBD
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.price} USD
                    </Typography>
                </CardContent>
                <div className={classes.buttonContainer}>
                    <Button onClick={onClose}>Go back</Button>
                    <Button onClick={handleOrderNowClick} variant="contained" color="primary">
                        Order now
                    </Button>
                </div>
            </Card>
        </Modal>
    );
};

export default ProductInfoPopup;
