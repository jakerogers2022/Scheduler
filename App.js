import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CourseEditScreen from './screens/CourseEditScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import UserContext from './UserContext';
import RegistrationScreen from './screens/RegistrationScreen';
import { firebase } from './firebase';


const Stack = createStackNavigator();



const SignInButton = ({ navigation, user }) => (
    user && user.uid
        ? <Button title="Logout" color="#448aff"
            onPress={() => firebase.auth().signOut()}
        />
        : <Button title="SignIn" color="#448aff"
            onPress={() => navigation.navigate('RegistrationScreen')}
        />
);

const App = () => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((auth) => {
            setAuth(auth);
        });
    }, []);

    useEffect(() => {
        if (auth && auth.uid) {
            const db = firebase.database().ref('users').child(auth.uid);
            const handleData = snap => {
                setUser({ uid: auth.uid, ...snap.val() });
            }
            db.on('value', handleData, error => alert(error));
            return () => { db.off('value', handleData); };
        } else {
            setUser(null);
        }
    }, [auth]);



    return (
        <UserContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ScheduleScreen"
                        component={ScheduleScreen}
                        options={{ title: 'Schedule' }}
                        options={({ navigation }) => ({
                            title: "Schedule",
                            headerRight: () => (
                                <SignInButton navigation={navigation} user={user} />
                            ),
                        })
                        }
                    />
                    <Stack.Screen name="CourseDetailScreen"
                        component={CourseDetailScreen}
                        options={{ title: 'Course detail' }}
                    />
                    <Stack.Screen name="CourseEditScreen"
                        component={CourseEditScreen}
                        options={{ title: 'Course Editor' }}
                    />
                    <Stack.Screen name="RegistrationScreen"
                        component={RegistrationScreen}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
};
export default App;