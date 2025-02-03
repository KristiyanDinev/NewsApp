import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import TitleBar from '../components/TitleBar';
import aboutAppStyle from '../styles/AboutAppStyle'

export default function AboutAppScreen() {
    return (
        <View>
            <TitleBar />
            <View style={aboutAppStyle.box}>
<ScrollView>
                <Text style={aboutAppStyle.title}>About the app</Text>

                <Text style={aboutAppStyle.text}>This purpose of this app is to help others in their walk with God.
                    You can see many posts from different topics.
                </Text>

                <Text style={aboutAppStyle.text}>The posts have a title and tags to give more information about what the post.
                    There are attachments and thumbnail for the post for extra information. You can also see who posted the post in case you want to contact that person or find all of their posts.
                    The date time in `Posted on` is converted to your local timezone, so it to be easier for you. All of the posts are aimed at helping and sharing to others their experience and knowledge.
                </Text>

                <Text style={aboutAppStyle.text}>You can also post a post if you become admin, but to become admin you have to contact us. You can go in `Contact us` page to read more about that.
                    Every admin has a username and a password and rules to follow like what kind of posts he/she is allowed to make and what kind of content to add in there.
                    Not everyone will be accepted to an admin, but if you are called to be then reach out to us and we will chat with you about it.
                </Text>

                <Text style={aboutAppStyle.text}>So the whole app is inspired by God. The idea started when a friend of mine said we need an app for the present truth. Such as news about the church, pope, evangelising or other biblical/spiritual events and facts.
                    Then the idea grew more and more and we started considering making this app. Then I the developer who can't do the smallest project without help ("the smallest" as of TODO list or news app or video app like YouTube). Then when I started coding the app and making plans for it. 
                    I started with the server then went to code the client app. And then I got guidance and some rules on how to make the app by the Spirit.
                    Here are some of the rules: 
                    1. No using of third-party libraries that add more style, looks, functionality or anything else that is not for this app.
                    2. Using simple style and different from the world.
                    3. No extra code for the sake of the style. END OF RULES. 


                    So I will say that by the guidance of God and His help and grace managed to develop this app. And I hope that God will use it as He pleases.
                    Truly I tell you. I wouldn't be able to code this app by myself. I encountered errors that I couldn't fix, but God helped me and He still helps me.
                </Text>

                <View style={{height: 200}}></View>
                </ScrollView>
            </View>
            
        </View>
    );
}

