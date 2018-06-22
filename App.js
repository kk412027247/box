
import React, { Component } from 'react';
import { StyleSheet, View, Animated, Button, Text} from 'react-native';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      position: new Animated.Value(0) ,
      opacity: new Animated.Value(0),
    };

    // 定义循环动画，
    this.loopAnimated = Animated.loop(

      //同步动画，同时变化两个数值
      Animated.parallel([
        Animated.timing(
          this.state.position,{
            toValue:300,
            duration:5000,
          }
        ),
        Animated.timing(
          this.state.opacity,{
            toValue:1,
            duration:5000,
          }
        )
      ])
      //在start之前定义使用原生线程运行动画
      ,{useNativeDriver: true}
    )

  }

  
  // 监听动画时候，页面是否更新
  componentDidUpdate(){
    console.log('update')
  }


  //页面加载完毕，开始动画
  componentDidMount(){
    this.loopAnimated.start()
  }

  // 页面卸载，停止动画
  componentWillUnmount(){
    this.loopAnimated.stop()
  }

  render() {
    let {position, opacity} =  this.state;
    return (
      <View style={styles.container}>
       <View style={styles.box}>
         <Animated.View
           style={[styles.line,{
             top:position,
             opacity:opacity.interpolate({
               inputRange:[0, 0.3, 0.6, 1],
               outputRange:[0, 1, 1, 0]
             })
           }]}
         />
       </View>
        <Button
          title={'stop'}
          onPress={this.loopAnimated.stop}
        />
        <Text>如果动画停止，只有在重载组件的时候才会再启动</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  box:{
    width:300,
    height:300,
    borderColor:'red',
    borderWidth:1,
  },
  line:{
    width:300,
    borderColor:'black',
    borderWidth:2,
    position:'relative',
  }
});
