/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  PanResponder,
  TouchableHighlight,
  AppState,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { ListComponent } from './components/ListComponent';
import { EnterTask } from './containers/EnterTask';
import { DisplayInfo } from './containers/DisplayInfo';
import { FAB } from 'react-native-paper';
import { styles } from './Styles/Styles';
import { getAll, update, post, remove } from './utils/api';
import ImagePicker from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { requestStorage, requestLocationPermission } from './utils/functions'
Geocoder.init('YOUR-API-KEY'); // use a valid API key

const App = () => {
  const [state, setState] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasks2, setTasks2] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleInfo, setvisibleInfo] = useState(false);
  const [textField, setTextField] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [location, setLocation] = useState([]);
  const [currItem, setCurrItem] = useState(tasks2[0]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (gesture.dx > 25) {
        setState(false);
      }
      if (gesture.dx < -25) {
        setState(true);

      }
    },
  });

  async function getTasks() {
    const data = await getAll();
    data.data.sort((a, b) => a.position - b.position);
    setTasks(data.data);
  }
  useEffect(() => {
    getTasks();
  }, []);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = slectedDate => {
    setDate(slectedDate);
    hideDatePicker();
  };

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      tasks.map(e => {
        if (!e._id) {
          postData(e);
        }
        else {
          updateTask(e._id, e);
        }
      });
    }
    else {
      getTasks();
    }
  };
  const deleteData = (id) => {
    remove(id);
  };
  const postData = (e) => {
    post(e);
  };

  const updateTask = (id, body) => {
    update(id, body);
  };

  useEffect(() => {
    const dir = [];
    requestLocationPermission();
    Geolocation.getCurrentPosition(e => {

      Geocoder.from(e.coords.latitude, e.coords.longitude).then(res => {
        const results = res.results[0].address_components;
        results.forEach(addresses => {
          if (addresses.types.includes('route') && !dir.includes(addresses.long_name)) {
            dir.unshift(addresses.long_name);
          }
          if (addresses.types.includes('street_number') && !dir.includes(addresses.long_name)) {
            dir.push(addresses.long_name);
          }
          if (addresses.types.includes('country') && !dir.includes(addresses.long_name)) {
            dir.push(addresses.long_name);
          }
          if (addresses.types.includes('administrative_area_level_1') && !dir.includes(addresses.long_name)) {
            dir.push(addresses.long_name);
          }
          setLocation(dir);
        });
      });
    },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [visible]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  });

  useEffect(() => {
    const data2 = tasks.map((e, i) => ({
      key: `item-${i}`,
      id: e._id,
      label: e.task,
      active: e.active,
      position: e.position,
      date: e.date,
      location: e.location,
      picture: e.picture,
    })).filter(e => e.active === state);
    setTasks2(data2);
  }, [state, tasks]);

  const EmptyList = () => {
    const text = state
      ? "You haven't compleated any task yet"
      : 'You have no pending tasks';

    return <Text style={styles.emptyText}>{text}</Text>;
  };

  const closeModal = () => {
    setVisible(false);
    setTextField('');
    setImage('');
    setDate('');
    setvisibleInfo(false);
    setLocation([]);
  };

  const addTask = async () => {
    const index = Object.keys(tasks).length;
    const img = image === '' ? null : image;
    const newTask = {
      task: textField,
      position: index,
      active: false,
      picture: img,
      date: date,
      location: location.join(','),
    };
    setTasks([...tasks, newTask]);
    closeModal();
  };

  const onChangeEvent = (pos) => {
    tasks[pos].active = !tasks[pos].active;
    setTasks([...tasks]);
  };

  const reorder = (data) => {
    data.forEach((e, i) => {
      const task = tasks.find(item => item.task === e.label);
      task.position = i;
    });
  };

  const deleteTask = (item) => {
    const newTasks = tasks2.filter(e => {
      return e.label !== item.label;
    });
    setTasks2(newTasks);
    if (item.id) {
      deleteData(item.id);
    }
    closeModal();
  };

  const chooseImage = () => {
    requestStorage();
    const options = {
      title: 'Please choose between camera or gallery',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.path);
      }
    });
  };

  const renderItem = ({ item, index, move, moveEnd }) => {
    return (
      <ListComponent
        item={item}
        index={index}
        move={move}
        moveEnd={moveEnd}
        setvisibleInfo={setvisibleInfo}
        setCurrItem={setCurrItem}
        onChangeEvent={onChangeEvent} />
    );
  };

  return (
    <>
      <EnterTask
        visible={visible}
        closeModal={closeModal}
        chooseImage={chooseImage}
        textField={textField}
        setTextField={setTextField}
        showDatePicker={showDatePicker}
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
        addTask={addTask}
      />
      <DisplayInfo
        view={visibleInfo}
        item={currItem}
        visibleInfo={visibleInfo}
        setvisibleInfo={setvisibleInfo}
        closeModal={closeModal}
        deleteTask={deleteTask}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.view}>
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={() => setState(false)}>
          <Text style={state ? styles.options : styles.options2}>To-Do</Text>
        </TouchableHighlight>
        <View style={styles.divider} />
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={() => setState(true)}>
          <Text style={state ? styles.options2 : styles.options}>Done</Text>
        </TouchableHighlight>
      </View>
      <View {...panResponder.panHandlers} style={styles.swipesGestureContainer}>
        {Object.keys(tasks2).length > 0 ? (
          <DraggableFlatList
            data={tasks2}
            renderItem={renderItem}
            keyExtractor={(item) => `draggable-item-${item.key}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => { setTasks2(data); reorder(data); }}
          />
        ) : (
            <EmptyList />
          )}
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => setVisible(true)}
      />
    </>
  );
};

export default App;
