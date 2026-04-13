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
          <Text style={styles.sectionTitle}>Custom Tooltip (Default & Custom Styling)</Text>
          <RangeSlider
            min={0}
            max={100}
            initialLowValue={20}
            initialHighValue={80}
            showTooltip
          />
          <View style={{ height: 20 }} />
          <RangeSlider
            min={0}
            max={500}
            initialLowValue={100}
            initialHighValue={400}
            showTooltip
            tooltipColor="#10b981"
            tooltipTextColor="#fff"
            tooltipFontSize={14}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dynamic Background Color Stops (Single Mode)</Text>
          <RangeSlider
            min={0}
            max={100}
            initialLowValue={singleValue}
            singleThumbMode
            onValueChange={(val) => setSingleValue(val)}
            enableColorStops={true}
            activeTrackColorStops={[
              { percent: 0, color: '#ef4444' },    // Red
              { percent: 50, color: '#f59e0b' },   // Orange
              { percent: 100, color: '#10b981' }  // Green
            ]}
          />
          <Text style={styles.valueText}>Percentage-based Color: {Math.round(singleValue)}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Range Slider with Color Stops (Center Reference)</Text>
          <RangeSlider
            min={0}
            max={100}
            lowValue={range.low}
            highValue={range.high}
            onValueChange={handleRangeChange}
            enableColorStops={true}
            colorStopReference="center"
            activeTrackColorStops={[
              { percent: 0, color: '#3b82f6' },    // Blue
              { percent: 50, color: '#8b5cf6' },   // Purple
              { percent: 100, color: '#ec4899' }  // Pink
            ]}
            showTooltip
          />
          <Text style={styles.valueText}>
            Color changes based on Range Center: {Math.round((range.low + range.high) / 2)}%
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RTL Support & Permanent Tooltips</Text>
          <RangeSlider
            min={0}
            max={100}
            isRTL={true}
            activeTrackColor="#8b5cf6"
            showTooltip
            alwaysShowTooltip
          />
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
