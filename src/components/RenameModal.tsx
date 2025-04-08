import {colors} from '#/themes/colors';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';
import {IconButton} from 'react-native-paper';

interface RenameModalProps {
  visible: boolean;
  onClose: () => void;
  onRename: (newName: string) => void;
  initialName: string;
}

const RenameModal: React.FC<RenameModalProps> = ({
  visible,
  onClose,
  onRename,
  initialName,
}) => {
  const [newName, setNewName] = useState<string>(initialName);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setNewName(initialName);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, initialName, fadeAnim]);

  const handleBack = () => {
    onClose();
  };

  const handleDone = () => {
    if (newName.trim()) {
      onRename(newName.trim());
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={handleBack}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.modalContainer, {opacity: fadeAnim}]}>
          <Text style={styles.modalTitle}>Rename</Text>

          <TextInput
            style={styles.textInput}
            value={newName}
            onChangeText={setNewName}
            autoFocus={true}
            selectTextOnFocus={true}
            selectionColor="#FFD700"
            placeholderTextColor="#999999"
            placeholder="Enter new name"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <IconButton
                icon="chevron-left"
                iconColor="#FFFFFF"
                size={20}
                style={styles.backIcon}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneText}>Done</Text>
              <View style={styles.checkCircle}>
                <IconButton
                  icon="check"
                  iconColor="#2D2D3F"
                  size={16}
                  style={styles.checkIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: colors.Bg2,
    borderRadius: 35,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#AAAAAA',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000000',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    margin: 0,
    padding: 0,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: -5,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneText: {
    color: colors.Accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.Accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    margin: 0,
    padding: 0,
  },
});

export default RenameModal;
