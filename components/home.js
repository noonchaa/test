import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function Home({ navigation }) {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedPriceSort, setSelectedPriceSort] = useState('')
    const [loading, setLoading] = useState(false)

    const getProducts = async () => {
        setLoading(true)
        try {
            const res = await fetch('https://dummyjson.com/products')
            const data = await res.json()
            setProducts(data.products)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCategory = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products/categories')
            const data = await res.json()
            setCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    const sortCategory = async (value) => {
        setSelectedPriceSort('')
        setSelectedCategory(value)
        setLoading(true)
        try {
            const res = await fetch('https://dummyjson.com/products/category/'+value)
            const data = await res.json()
            setProducts(data.products)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const sortPrice = (value) => {
        if (value == 'low') {
            setSelectedPriceSort(value)
            let sortedPrice = products.sort((a, b) => a.price - b.price)
            setProducts(sortedPrice)
        } else {
            setSelectedPriceSort(value)
            let sortedPrice = products.sort((a, b) => b.price - a.price)
            setProducts(sortedPrice)
        }
    }

    useEffect(() => {
        getProducts()
        getAllCategory()
    }, [])

    return (
        <View>
                    <Text style={{marginStart:12}}>Category :</Text>
                    <ScrollView horizontal style={styles.categoryContainer}>
                        {category.map((item, index) => (
                            <Text style={[styles.category,{marginBottom:6}, selectedCategory == item ? styles.active : '']} key={index} onPress={() => sortCategory(item)}>{item}</Text>
                        ))}
                    </ScrollView>
                    <Text style={{marginStart:12}}>Sort by :</Text>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 12, marginBottom: 12 }}>
                        <Text style={[styles.category, selectedPriceSort == 'low' ? styles.active : '']} onPress={() => sortPrice('low')}>Lowest Price</Text>
                        <Text style={[styles.category, selectedPriceSort == 'high' ? styles.active : '']} onPress={() => sortPrice('high')}>Highest Price</Text>
                    </View>
                    {loading ? <ActivityIndicator style={{justifyContent: 'center', height: 400}}/>:
                    <FlatList numColumns={2} style={{ paddingHorizontal: 12, marginBottom: 84 }} data={products} renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => navigation.navigate('Product',{product:item})} style={styles.product}>
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.thumbnail }} style={styles.image} />
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.price}>$ {item.price}</Text>
                                    <Text>Stock: {item.stock}</Text>
                                    <Text style={styles.desc}>{item.description.slice(0, 20)}...</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginHorizontal: 12
    },
    category: {
        paddingRight: 8,
        height: 16,
        textTransform: 'capitalize'
    },
    active: {
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    },
    product: {
        width: '48%',
        borderRadius: 8,
        marginEnd: 12,
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 5,
        backgroundColor: '#f1f5f9'
    },
    imageContainer: {
        width: '100%',
        height: 100
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'cover'
    },
    details: {
        padding: 6
    },
    title: {
        fontWeight: '500',
        fontSize: 14,
        textTransform: 'capitalize'
    },
    price: {
        fontWeight: '400',
        fontSize: 13,
        color: '#22c55e'
    },
    desc: {
        fontSize: 12,
        marginTop: 6
    }
});
