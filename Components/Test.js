// // Components/Test.js
//
// import React from 'react'
// import {Animated ,StyleSheet, View,Platform } from 'react-native'
//
// class Test extends React.Component {
//
//   constructor(props){
//     super(props)
//     this.state = {
//       topPosition : new Animated.Value(0)
//     }
//   }
//   componentDidMount(){
//     Animated.spring{
//       this.state.topPosition,
//       {
//         toValue: 100,
//         duration: 3000
//         bounciness : 30
//       }
//     }.start()
//   }
//   render() {
//     return (
//       <View style={styles.main_container}>
//         <Animated.View style={[styles.animation_view,{top:this.state.topPosition}]}>
//         </Animated.View>
//       </View>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   main_container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   subview_container: {
//      ...Platform.select({
//        ios: {
//          backgroundColor : 'red'
//        },
//        android : {
//          backgroundColor: 'red'
//        }
//      }),
//      width: 50,
//      height: 100
//   }
// })
//
// export default Test
