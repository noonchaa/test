import Home from './components/home';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './components/product';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HOME' component={Home}/>
        <Stack.Screen name='Product' component={Product} options={({route})=>({title:route.params.product.title.toUpperCase()})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
