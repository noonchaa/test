import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";

export default function Product({ route }) {
    const { rating, category, description, images, price, stock, title } = route.params.product
    let imgSource = images.map((item) => ({ img: item }))
    return (
        <SafeAreaView>
            <ImageSlider data={imgSource} autoPlay caroselImageStyle={{ resizeMode: 'cover' }} />
            <View style={styles.container}>
                <Text style={styles.price}>$ {price}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text><Image source={require('../assets/star.png')} style={{height:13,width:13}}/> {rating}</Text>
                <Text style={styles.tag}><Image source={require('../assets/tag.png')} style={{height:13,width:13}}/> {category}</Text>
                <Text style={styles.tag}>Stock: {stock}</Text>
                <Text style={styles.desc}>Description: </Text>
                <Text>{description}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = new StyleSheet.create({
    container: {
        padding: 12
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#22c55e'
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        paddingVertical: 18,
        textTransform: 'capitalize'
    },
    tag: {
        marginTop: 6,
        textTransform: 'capitalize'
    },
    desc: {
        marginTop: 12,
        marginBottom: 6
    }
})