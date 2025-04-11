import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Word } from '../types';
import { colors } from '../theme/colors';

interface WordDetailsModalProps {
  visible: boolean;
  word: Word | null;
  onClose: () => void;
}

const WordDetailsModal: React.FC<WordDetailsModalProps> = ({ visible, word, onClose }) => {
  if (!word) return null;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalWord}>{word.text}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Root:</Text>
            <Text style={styles.detailValue}>{word.root}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender:</Text>
            <Text style={styles.detailValue}>{word.gender}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Number:</Text>
            <Text style={styles.detailValue}>{word.number}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '80%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalWord: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  detailRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: colors.text,
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.surface,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WordDetailsModal;
