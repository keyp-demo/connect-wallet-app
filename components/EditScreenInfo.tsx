import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnect from "@walletconnect/client";
import React from 'react';
import { Alert, Button, TouchableHighlight } from 'react-native';

import { Text, View } from './Themed';
import { ethers } from 'ethers';

export default function EditScreenInfo({ path }: { path: string }) {
  // return (
  //   <View>
  //     <Text>12222</Text>
  //     </View>
  // );
  const connector = useWalletConnect();
  if (!connector.connected) {
    return <Button title="Connect" onPress={() => connector.connect()} />
  }

  return (
    <View>
      <TouchableHighlight
        style={{
          marginBottom: 20,
        }}>
        <Button title="signer" onPress={async () => await signer(connector)} />
      </TouchableHighlight>
      <Button title="Kill Session" onPress={() => connector.killSession()} />
    </View>
  );
}

async function signer(connector: WalletConnect) {
  const userId = "dIPs1srYFLNOhyptxgdxO9KBJm33";
  const timestamp = new Date().getTime();
  // const timestamp = 1644583981945;
  const messageInfo = `This information is only used to verify user: ${userId} is the owner of address ${connector.accounts[0]}. It is valid before ${timestamp}`;
  const messageBytes = ethers.utils.toUtf8Bytes(messageInfo);
  const signature = await connector.signPersonalMessage([messageBytes, connector.accounts[0]]);
  console.log(signature, timestamp);
  Alert.alert('提示', signature);
}
