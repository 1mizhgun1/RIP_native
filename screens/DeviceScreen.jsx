import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetDevice, setDevice } from '../store/deviceSlice';
import { axiosInstance } from '../API';

export default function DeviceScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { device } = useSelector((store) => store.device);
    useEffect(() => {
        async function getOneDevice() {
            await axiosInstance.get(`/products/${id}`).then((response) => dispatch(setDevice(response?.data)));
        }
        getOneDevice();
        return () => {
            dispatch(resetDevice());
        };
    }, [dispatch]);
    return (
        <View>
            <Text>{device.title}</Text>
        </View>
    );
}