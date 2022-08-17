import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileCard from "../components/account/profile-card";
import { ActivityIndicator, DataTable } from "react-native-paper";
import { getReservations } from "../api/reservation-service";
import moment from "moment";
import colors from "../utils/constants/colors";

const ReservationsScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const resp = await getReservations();
      setReservations(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading}  onRefresh={loadData} />
      }
    >
      <ProfileCard />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator animating={true} color={colors.color1} />
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Car</DataTable.Title>
              <DataTable.Title>Pickup Location</DataTable.Title>
              <DataTable.Title>Pickup Date</DataTable.Title>
            </DataTable.Header>

            {reservations.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.car.model}</DataTable.Cell>
                <DataTable.Cell>{item.pickUpLocation}</DataTable.Cell>
                <DataTable.Cell>
                  {moment(item.pickUpTime).format("lll")}
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {reservations.length <= 0 && (
              <DataTable.Row>
                <DataTable.Cell>No reservation</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        )}
      </View>
    </ScrollView>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    paddingTop: 20,
    paddingBottom:50
  },
});
