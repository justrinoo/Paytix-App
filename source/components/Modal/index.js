import React from 'react';
import {View, Text, Pressable, Modal, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ModalComponent({
  setModalVisible,
  modalVisibile,
  methodPayment,
}) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibile}
        onRequestClose={() => {
          setModalVisible(!modalVisibile);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalViewHeader}>
              <View>
                <Text style={styles.modalViewHeader_title}>Transfer</Text>
              </View>
              <View style={{backgroundColor: '#14142B', borderRadius: 8}}>
                <Pressable onPress={() => setModalVisible(!modalVisibile)}>
                  <Icon name="close" color="#FFFFFF" size={25} />
                </Pressable>
              </View>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.modalBody_column}>
                <Image
                  source={
                    methodPayment === 'Gopay'
                      ? require('../../assets/images/GoPay.png')
                      : methodPayment === 'Ovo'
                      ? require('../../assets/images/Ovo.png')
                      : methodPayment === 'Paypal'
                      ? require('../../assets/images/Paypal.png')
                      : methodPayment === 'GooglePay'
                      ? require('../../assets/images/GooglePay.png')
                      : methodPayment === 'BCA'
                      ? require('../../assets/images/BCA.png')
                      : methodPayment === 'BRI'
                      ? require('../../assets/images/BRI.png')
                      : null
                  }
                  style={styles.modalImage}
                />
              </View>
              <View style={styles.modalBody_column}>
                <Text style={styles.modalBody_title}>
                  {methodPayment === 'Gopay'
                    ? '+62 857 8233 1200'
                    : methodPayment === 'Ovo'
                    ? '+62 857 8233 1200'
                    : methodPayment === 'Paypal'
                    ? '111-00-0459047-3'
                    : methodPayment === 'GooglePay'
                    ? '+62 857 8233 120'
                    : methodPayment === 'BCA'
                    ? '010 642 703 5'
                    : methodPayment === 'BRI'
                    ? '032 900 977 9'
                    : null}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#000000',
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 30,
              }}>
              Any Question?
            </Text>
            <View style={styles.modalBody_whatsap}>
              <View style={styles.modalBody_column}>
                <Icon
                  name="logo-whatsapp"
                  color="#FFFFFF"
                  size={22}
                  style={{marginHorizontal: 20}}
                />
              </View>
              <View style={styles.modalBody_column}>
                <Text
                  style={{
                    marginRight: 30,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                  }}>
                  +62 857 8233 1200
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginHorizontal: 60,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalViewHeader: {
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalViewHeader_title: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '600',
  },
  modalBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 4,
  },
  modalBody_whatsap: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#00BA88',
    padding: 12,
    borderRadius: 50,
  },
  modalBody_title: {
    color: '#4E4B66',
    fontWeight: 'bold',
  },
  modalImage: {
    width: 80,
    resizeMode: 'contain',
    height: 32,
  },
});
