import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import RangeSlider from './src';

const Example = () => {
  const [range, setRange] = useState({ low: 20, high: 80 });
  const [singleValue, setSingleValue] = useState(50);

  const handleRangeChange = useCallback((low: number, high: number) => {
    setRange({ low, high });
  }, []);

  const handleSingleChange = useCallback((low: number, _high: number) => {
    setSingleValue(low);
  }, []);

  const renderLabel = useCallback((value: number) => {
    return (
      <View style={styles.label}>
        <Text style={styles.labelText}>{Math.round(value)}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Range Slider Demo</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Default Range Slider</Text>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            onValueChange={handleRangeChange}
          />
          <Text style={styles.valueText}>
            Low: {Math.round(range.low)} | High: {Math.round(range.high)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Single Thumb Mode (Step 5)</Text>
          <RangeSlider
            min={0}
            max={100}
            step={5}
            singleThumbMode
            onValueChange={handleSingleChange}
            activeTrackColor="#10b981"
            thumbColor="#10b981"
          />
          <Text style={styles.valueText}>Value: {Math.round(singleValue)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>With Labels & Custom Styling</Text>
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            initialLowValue={200}
            initialHighValue={800}
            renderLabel={renderLabel}
            trackHeight={6}
            thumbSize={32}
            activeTrackColor="#f59e0b"
            thumbColor="#ffffff"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disabled State</Text>
          <RangeSlider
            min={0}
            max={100}
            disabled
            initialLowValue={30}
            initialHighValue={70}
            inactiveTrackColor="#d1d5db"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RTL Support (Manual Override)</Text>
          <RangeSlider
            min={0}
            max={100}
            isRTL={true}
            activeTrackColor="#8b5cf6"
          />
          <Text style={styles.subtitle}>(Notice Min is on the right, Max on the left)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#111827',
  },
  section: {
    marginBottom: 40,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#374151',
  },
  valueText: {
    marginTop: 15,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 10,
    textAlign: 'center',
  },
  label: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  labelText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Example;
