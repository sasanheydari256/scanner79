import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, ViewStyle, Platform } from 'react-native';
import { SCREEN_HEIGHT } from '../../../constants/Screen';
import { useTheme } from '../../../theme/ThemeProvider';

type CustomRefreshProps = {
  children: React.ReactNode;
  handleRefresh: () => Promise<void>; // Ensure it returns a Promise
  style?: ViewStyle | ViewStyle[]; // Add optional style prop
};

const CustomRefresh = forwardRef(({ children, handleRefresh = () => { }, style }: CustomRefreshProps, ref) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null); // Ref for ScrollView

  // Function to scroll to the bottom
  const scrollToBottom = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: SCREEN_HEIGHT * 0.32, // Adjust this value to the desired vertical position
        animated: true,
      });
    }
  }, []);

  // Combined function to handle data fetching and refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await handleRefresh(); // Await the Promise
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [handleRefresh]);

  // Expose scrollToBottom to the parent component
  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));
  const { theme } = useTheme();

  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.background,
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          height: 20,
          bottom: Platform.OS === 'ios' ? '1.9%' : '2.2%',
        }}
      >

      </View>
      <ScrollView

        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={[styles.container, style, {
          backgroundColor: theme.colors.background,
          borderRadius:20

        }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          borderRadius:400

         }}
      >
 
    {children}
  
      </ScrollView >
    </>

  );
});

const styles = StyleSheet.create({
  container: {
    bottom: Platform.OS === 'ios' ? '3.2%' : '4.1%',
    overflow: 'hidden',
    zIndex: 100, // می‌توانید آن را فعال کنید,

  },
});

export default CustomRefresh;




// import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
// import { View, Text, ScrollView, RefreshControl, StyleSheet, ViewStyle, Platform } from 'react-native';
// import { SCREEN_HEIGHT } from '../../../constants/Screen';
// import { useTheme } from '../../../theme/ThemeProvider';

// type CustomRefreshProps = {
//   children: React.ReactNode;
//   handleRefresh: () => Promise<void>; // Ensure it returns a Promise
//   style?: ViewStyle | ViewStyle[]; // Add optional style prop
// };

// const CustomRefresh = forwardRef(({ children, handleRefresh = () => { }, style }: CustomRefreshProps, ref) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const scrollViewRef = useRef<ScrollView | null>(null); // Ref for ScrollView

//   // Function to scroll to the bottom
//   const scrollToBottom = useCallback(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         y: SCREEN_HEIGHT * 0.32, // Adjust this value to the desired vertical position
//         animated: true,
//       });
//     }
//   }, []);

//   // Combined function to handle data fetching and refresh
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await handleRefresh(); // Await the Promise
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   }, [handleRefresh]);

//   // Expose scrollToBottom to the parent component
//   useImperativeHandle(ref, () => ({
//     scrollToBottom,
//   }));
//   const { theme } = useTheme();

//   return (
//     <>
//       <View
//         style={{
//           backgroundColor: theme.colors.background,
//           borderTopEndRadius: 15,
//           borderTopStartRadius: 15,
//           height: 20,
//           bottom: Platform.OS === 'ios' ? '3.2%' : '2.4%',
//         }}
//       >

//       </View>
//       <ScrollView

//         ref={scrollViewRef}
//         showsVerticalScrollIndicator={false}
//         style={[styles.container, style, {
//           backgroundColor: theme.colors.background,
//         }]}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         contentContainerStyle={{ }}
//       >

//         {children}
//       </ScrollView >
//     </>

//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     bottom: Platform.OS === 'ios' ? '3.2%' : '3.4%',
//     overflow: 'hidden',
//     zIndex: 100, // می‌توانید آن را فعال کنید
//   },
// });

// export default CustomRefresh;




// v1

// import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
// import { View, Text, ScrollView, RefreshControl, StyleSheet, ViewStyle, Platform } from 'react-native';
// import { SCREEN_HEIGHT } from '../../../constants/Screen';
// import { useTheme } from '../../../theme/ThemeProvider';

// type CustomRefreshProps = {
//   children: React.ReactNode;
//   handleRefresh: () => Promise<void>; // Ensure it returns a Promise
//   style?: ViewStyle | ViewStyle[]; // Add optional style prop
// };

// const CustomRefresh = forwardRef(({ children, handleRefresh = () => { }, style }: CustomRefreshProps, ref) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const scrollViewRef = useRef<ScrollView | null>(null); // Ref for ScrollView

//   // Function to scroll to the bottom
//   const scrollToBottom = useCallback(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         y: SCREEN_HEIGHT * 0.32, // Adjust this value to the desired vertical position
//         animated: true,
//       });
//     }
//   }, []);

//   // Combined function to handle data fetching and refresh
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await handleRefresh(); // Await the Promise
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   }, [handleRefresh]);

//   // Expose scrollToBottom to the parent component
//   useImperativeHandle(ref, () => ({
//     scrollToBottom,
//   }));
//   const { theme } = useTheme();

//   return (
//     <ScrollView
    
//       ref={scrollViewRef}
//       showsVerticalScrollIndicator={false}
//       style={[styles.container, style, {
//         backgroundColor: theme.colors.background,
//       }]}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       {children}
//     </ScrollView>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     bottom: Platform.OS === 'ios' ? '3.2%' : '2.4%',
//     borderRadius: 15,
//     overflow: 'hidden',
//     zIndex: 100, // می‌توانید آن را فعال کنید
//   },
// });

// export default CustomRefresh;
