import { StyleSheet, Text, View, Image, FlatList, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { NewsContext } from '../utilities/NewsContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';

// Import GestureHandlerRootView from react-native-gesture-handler
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = (props) => {
    const { navigation } = props;
    const { getNews } = useContext(NewsContext);
    const [data, setData] = useState([]); // khởi tạo danh sách bài viết
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState(''); // State để lưu trữ nội dung tìm kiếm
    const [filteredData, setFilteredData] = useState([]); // State để lưu trữ dữ liệu hiển thị

    useEffect(() => {
        const getData = async () => {
            const result = await getNews();
            setData(result);
            setFilteredData(result); // Initialize filteredData with the same data
        };
        getData();
        return () => { }
    }, []);

    const refreshingData = async () => {
        setRefreshing(true);
        const result = await getNews();
        // Check if there are any items that have been deleted
        const updatedData = data.filter((item) => result.some((newItem) => newItem._id === item._id));
        setData(updatedData);
        setFilteredData(updatedData);
        setRefreshing(false);
    };

    const renderItem = (props) => {
        const { item } = props;
        const { _id, title, content, image, createdAt } = item;

        const displayDate = (value) => {
            const date = new Date(value);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        const deleteItem = (itemId) => {
            // Update the data state to remove the item to be deleted
            const updatedData = data.filter((item) => item._id !== itemId);
            setData(updatedData);
            setFilteredData(updatedData); // Update filteredData when an item is deleted
        };

        const renderRightActions = () => (
            <View style={styles.rightActions}>
                <Pressable style={styles.deleteText} onPress={() => deleteItem(_id)}>
                    <Icon name="trash" size={30} color="white" />
                </Pressable>
            </View>
        );

        return (
            <Swipeable renderRightActions={() => renderRightActions(_id)}>
                <Pressable onPress={() => navigation.navigate("Detail", { id: _id })}>
                    <View style={styles.row}>
                        <View>
                            <Image source={{ uri: image }} style={styles.customImage} />
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.font}>{title}</Text>
                            <Text style={styles.font1}>{content}</Text>
                            <Text style={styles.font2}>{displayDate(createdAt)}</Text>
                        </View>
                    </View>
                </Pressable>
            </Swipeable>

        );
    }

    // Update filteredData based on the searchText
    useEffect(() => {
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.content.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchText, data]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm..."
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                />
                <Pressable style={styles.iconSearch}>
                    <Icon name="search" size={20} color="#000" />
                </Pressable>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={refreshingData}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 50,
        paddingStart: 10,
        marginHorizontal: 4,
        marginBottom: 12,
        borderTopColor: 'gray',
        borderLeftColor: 'gray',
        borderRightColor: 'gray',
        borderBottomColor: 'blue',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 12
    },
    iconSearch: {
        position: 'absolute',
        top: 38,
        right: 45,
    },
    rightActions: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    deleteText: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '60%',
        backgroundColor: 'red',
    },
    column: {
        width: 240,
        paddingLeft: 4,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15.3,
    },
    customImage: {
        borderRadius: 8,
        width: 100,
        height: 100,
    },
    font: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: 'red',
        marginBottom: 4,
    },
    font1: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: 'black',
        marginBottom: 4,
    },
    font2: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#0000',
    },
});

export default Home;
