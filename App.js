import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

const App = () => {
  useEffect(() => {
    //ユーザーからマイクの使用許可を得る
    Audio.requestPermissionsAsync();
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true
    });
  }, []);

  const handlePress = async () => {
    if (!(await Audio.getPermissionsAsync())) {
      //マイクの使用許可が無い場合は弾く
      alert("マイクの使用許可がありません");
      return;
    }

    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      //録音をスタートする
      await recording.startAsync();
      console.log(recordingInstance.getStatusAsync());
      alert("スタートします");
    } catch (error) {
      console.log(error.message);
      alert("録音に失敗しました");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text>音声を録音する</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
