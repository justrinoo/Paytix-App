import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function index() {
  return (
    <View>
      {/* FOOTER */}
      <View style={styles.homeRows_footer}>
        <Image
          source={require('../../assets/images/tickitz.png')}
          style={styles.homeRows_footer_BannerImage}
        />
        <Text style={styles.homeRows_footer_description}>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>

        <View>
          <Text style={styles.homeRows_footer_listExplore_title}>Explore</Text>
          <View style={styles.homeRows_footer_listExplore}>
            <Text style={styles.homeRows_footer_listExplore_link_title}>
              Cinemas
            </Text>
            <Text style={styles.homeRows_footer_listExplore_link_title}>
              Movies List
            </Text>
            <Text style={styles.homeRows_footer_listExplore_link_title}>
              Notification
            </Text>
            <Text style={styles.homeRows_footer_listExplore_link_title}>
              My Ticket
            </Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.homeRows_footer_ourSponsors_title}>
              Our Sponsor
            </Text>
          </View>
          <View style={styles.homeRows_footer_ourSponsors_column}>
            <Image
              source={require('../../assets/images/Sponsor1.png')}
              style={styles.homeRows_footer_ourSponsors_Image}
            />
            <Image
              source={require('../../assets/images/Sponsor2.png')}
              style={styles.homeRows_footer_ourSponsors_Image}
            />
            <Image
              source={require('../../assets/images/Sponsor3.png')}
              style={styles.homeRows_footer_ourSponsors_Image}
            />
          </View>
        </View>

        <View>
          <Text style={styles.homeRows_footer_followUs_title}>Follow us</Text>
          <View style={styles.homeRows_footer_followUs_column}>
            <Icon name="facebook" size={20} color="#6E7191" />
            <Icon name="instagram" size={20} color="#6E7191" />
            <Icon name="twitter" size={20} color="#6E7191" />
            <Icon name="youtube" size={20} color="#6E7191" />
          </View>
        </View>

        <View style={styles.homeRows_footer_copyright}>
          <Text style={styles.homeRows_footer_copyright_title}>
            &copy; 2021 Tickitz. All Rights Reserved.
          </Text>
        </View>
      </View>
      {/* END FOOTER */}
    </View>
  );
}

const styles = StyleSheet.create({
  // FOOTER
  homeRows_footer: {
    backgroundColor: '#ffffff',
    marginTop: 140,
  },
  homeRows_footer_BannerImage: {
    marginTop: 75,
    width: 132,
    height: 36,
    marginLeft: 15,
  },
  homeRows_footer_description: {
    marginTop: 23,
    fontSize: 14,
    fontWeight: '400',
    color: '#6E7191',
    lineHeight: 24,
    width: '70%',
    marginLeft: 15,
    marginBottom: 40,
  },
  homeRows_footer_listExplore_title: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 15,
    color: '#000000',
  },
  homeRows_footer_listExplore_link_title: {
    color: '#6E7191',
    fontSize: 14,
    paddingLeft: 15,
    lineHeight: 24,
    marginTop: 12,
  },
  homeRows_footer_listExplore: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  homeRows_footer_ourSponsors_column: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeRows_footer_ourSponsors_title: {
    marginTop: 48,
    marginLeft: 15,
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  homeRows_footer_ourSponsors_Image: {
    width: 80,
    height: 25,
    marginTop: 16,
    resizeMode: 'contain',
  },
  homeRows_footer_followUs_title: {
    marginTop: 49,
    marginLeft: 15,
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
  },
  homeRows_footer_followUs_column: {
    marginLeft: 15,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  homeRows_footer_copyright: {
    marginTop: 66,
    marginLeft: 15,
  },
  homeRows_footer_copyright_title: {
    color: '#6E7191',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 64,
  },
});
