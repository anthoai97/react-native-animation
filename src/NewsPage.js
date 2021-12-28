import React, {useRef, useState, useEffect} from 'react';

import {
    View,
    Text,
    Animated,
    Easing,
    ScrollView,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import {FadeIn} from 'react-native-reanimated';
import NewsItem from './components/NewItem';
import Progress from './components/Progress';

const news_items = [
    {
        title: 'CTO Mentor Network – a virtual peer-to-peer network of CTOs',
        website: 'ctomentor.network',
        url: 'https://ctomentor.network/',
    },
    {
        title: 'The No More Ransom Project',
        website: 'nomoreransom.org',
        url: 'https://www.nomoreransom.org/',
    },
    {
        title: 'NASA Scientists Suggest We’ve Been Underestimating Sea Level Rise',
        website: 'vice.com',
        url: 'http://motherboard.vice.com/read/nasa-scientists-suggest-weve-been-underestimating-sea-level-rise',
    },
    {
        title: 'Buttery Smooth Emacs',
        website: 'facebook.com',
        url: 'https://www.facebook.com/notes/daniel-colascione/buttery-smooth-emacs/10155313440066102/',
    },
    {
        title: 'Elementary OS',
        website: 'taoofmac.com',
        url: 'http://taoofmac.com/space/blog/2016/10/29/2240',
    },
    {
        title: 'The Strange Inevitability of Evolution',
        website: 'nautil.us',
        url: 'http://nautil.us/issue/41/selection/the-strange-inevitability-of-evolution-rp',
    },
];

const NewsPage = () => {
    const opacityValue = useRef(new Animated.Value(0)).current;
    const [isNewRefreshing, setIsNewRefreshing] = useState(false);
    const [news, setNews] = useState(news_items);
    const opacity = opacityValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1],
    });

    const fadeIn = () => {
        Animated.timing(opacityValue, {
            toValue: 1,
            duration: 1600,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => opacityValue.setValue(0));

        setTimeout(() => {
            setIsNewRefreshing(false);
        }, 800);
    };

    useEffect(() => {
        refreshNews();
    }, []);

    function refreshNews() {
        setIsNewRefreshing(true);
    }

    function renderNewsItems() {
        return news.map((news, index) => {
            return <NewsItem key={index} index={index} news={news} />;
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                    <RefreshControl
                        colors={['#1e90ff']}
                        refreshing={false}
                        onRefresh={refreshNews}
                    />
                }
                style={styles.news_container}>
                <Animated.View style={{opacity: opacity, flex: 1}}>
                    {!isNewRefreshing ? (
                        renderNewsItems()
                    ) : (
                        <Progress
                            onDone={() => {
                                fadeIn();
                            }}
                        />
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 1,
    },
    news_container: {
        flex: 1,
    },
});

export default NewsPage;
