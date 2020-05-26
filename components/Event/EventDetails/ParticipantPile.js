
import React from "react";
import { connect } from "react-redux";
import { updateUserInfo, getUserInfo } from "../../../reducers/userInfo";
import FacePile from 'react-native-face-pile';
import { Dimensions, Text } from "react-native";
import { View } from "react-native";

function ParticipantPile({ participants, users }) {
    const avatars = [];
    let participant_uids = [];

    if (participants) {
        participant_uids = Object.keys(participants);
        console.log(Object.keys(participants));
    }
    if (users != null && users != undefined) {
        for (let i = 0; i < participant_uids.length; i++) {
            if (users[participant_uids[i]] != undefined) {
                avatars.push({
                    id: i,
                    imageUrl: users[participant_uids[i]].avatar_url,
                });
            }
            else {
                console.log("UNDEFINED USERS");
            }
        }
    }
    return (<View style={{
        flexDirection: 'row',
        marginTop: Dimensions.get("window").height * 0.02,
    }}>
        <FacePile style={{ flex: 2 }}
            numFaces={4}
            faces={avatars}
            hideOverflow={false}
            circleSize={Dimensions.get("window").width * 0.07} />
        <Text style={{
            flex: 8, textAlign: 'right',
            textAlignVertical: 'center',
            fontSize: Dimensions.get('window').fontScale * 18,
            fontWeight: "500",
        }}
        >{participant_uids.length > 0 ? (participant_uids.length + 1) + ' people are' : 'One person is'} joining.</Text>
    </View>)
}
const mapState = state => ({
    users: state.userInfo,
})

const mapDispatch = dispatch => {
    dispatch(getUserInfo());
    return {};
}

export default connect(mapState, mapDispatch)(ParticipantPile)