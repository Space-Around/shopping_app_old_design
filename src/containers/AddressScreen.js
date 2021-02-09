import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import styles from "../styles/styles";
import Input from "../components/Input";
import Button from "../components/Button";
import Carousel, { Pagination } from "react-native-snap-carousel";

const AddressScreen = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isRenderSetActiveBtn, setIsRenderSetActiveBtn] = React.useState(0);
  const [isRenderSetActiveBtn2, setIsRenderSetActiveBtn2] = React.useState(1);
  const [carouselItems, setCarouselItems] = React.useState([
    {
      addr: "117555, г. Москва ул. Яковлева, д. 12, кв. 5",
      isActive: true,
    },
    {
      addr: "117555, г. Москва ул. Яковлева, д. 12, кв. 5",
      isActive: false,
    },
    {
      addr: "117555, г. Москва ул. Яковлева, д. 12, кв. 5",
      isActive: false,
    },
    {
      addr: "117555, г. Москва ул. Яковлева, д. 12, кв. 5",
      isActive: false,
    },
    {
      addr: "117555, г. Москва ул. Яковлева, д. 12, кв. 5",
      isActive: false,
    },
  ]);

  let carousel;

  const renderCheck = (isActive) => {
    if (isActive)
      return (
        <Image
          style={{
            width: 20,
            height: 20,
            position: "absolute",
            top: -100,
            right: 0,
          }}
          source={require("../../assets/done.png")}
        />
      );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "lightgrey",
          borderRadius: 5,
          width: 280,
          height: 162,
          borderRadius: 16,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 30,
          paddingBottom: 15,
          marginLeft: 25,
          marginRight: 25,
          position: "relative",
        }}
      >
        <Text style={{ fontSize: 14 }}>Addres:</Text>
        <Text style={{ fontSize: 20 }}>{item.addr}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          {renderCheck(item.isActive)}
        </View>
      </View>
    );
  };

  let deviceWidth = Dimensions.get("window").width;
  let carouselItemsTmp = carouselItems;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Carousel
          layout={"default"}
          ref={(ref) => (carousel = ref)}
          data={carouselItems}
          sliderWidth={deviceWidth}
          itemWidth={330}
          renderItem={_renderItem}
          onSnapToItem={(index) => {
            setActiveIndex(index);

            if (carouselItems[index].isActive) {
              setIsRenderSetActiveBtn(0);
              setIsRenderSetActiveBtn2(1);
            } else {
              setIsRenderSetActiveBtn(1);
              setIsRenderSetActiveBtn2(0);
            }

            console.log(isRenderSetActiveBtn2);
          }}
        />
        <Pagination
          dotsLength={carouselItemsTmp.length}
          activeDotIndex={activeIndex}
          containerStyle={{ backgroundColor: "#f2f2f2" }}
          dotStyle={{
            width: 13,
            height: 13,
            borderRadius: 50,
            marginHorizontal: 1,
            backgroundColor: "#79408C",
          }}
          inactiveDotStyle={{
            backgroundColor: "lightgrey",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <Button
        title="SET ACTIVE"
        style={{
          marginLeft: 30,
          marginTop: 100,
          transform: [{ scale: isRenderSetActiveBtn }],
        }}
        onPress={() => {}}
      />
      <Button
        title="CONTINUE"
        style={{
          posidion: 'absolute',
          bottom: 50,
          left: 30,
          zIndex: 10,
          transform: [{ scale: isRenderSetActiveBtn2 }],
        }}
        onPress={() => {
          props.navigation.navigate('CardScreen');
        }}
      />
    </View>
  );
};

export default AddressScreen;
