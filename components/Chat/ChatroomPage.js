import React from 'react'
import { View, Text, Button, Flatlist, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements';

export function ChatroomPage({ route, navigation }) {
  React.useEffect(() => {
    if (route.params?.item) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.item]);
    return (
      <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat room page</Text>
        
        <ListItem
          title={route.params?.item.name}
          subtitle={route.params?.item.subtitle}
          leftAvatar={{ source: { uri: route.params?.item.avatar_url } }}
          bottomDivider
          chevron
        />
  
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
      
    );
}
/*

            <ScrollView>
            {
                    list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider
                    />
                    ))
            }
            </ScrollView>
             */