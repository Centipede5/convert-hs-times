// Import the necessary modules
const readline = require('readline');

// Conversion factors
const conversionFactors = {
  girls: {
    '200MedleyRelay': { 'yards-to-meters': 1.116, 'meters-to-yards': 0.8961 },
    '200Freestyle': { 'yards-to-meters': 1.108, 'meters-to-yards': 0.9025 },
    '200IM': { 'yards-to-meters': 1.110, 'meters-to-yards': 0.9009 },
    '50Freestyle': { 'yards-to-meters': 1.115, 'meters-to-yards': 0.8969 },
    '100Butterfly': { 'yards-to-meters': 1.111, 'meters-to-yards': 0.9001 },
    '100Freestyle': { 'yards-to-meters': 1.112, 'meters-to-yards': 0.8993 },
    '500Freestyle': { 'yards-to-meters': 0.8772, 'meters-to-yards': 1.1400 },
    '200FreestyleRelay': { 'yards-to-meters': 1.117, 'meters-to-yards': 0.8953 },
    '100Backstroke': { 'yards-to-meters': 1.111, 'meters-to-yards': 0.9001 },
    '100Breaststroke': { 'yards-to-meters': 1.112, 'meters-to-yards': 0.8993 },
    '400FreestyleRelay': { 'yards-to-meters': 1.114, 'meters-to-yards': 0.8977 }
  },
  boys: {
    '200MedleyRelay': { 'yards-to-meters': 1.115, 'meters-to-yards': 0.8969 },
    '200Freestyle': { 'yards-to-meters': 1.108, 'meters-to-yards': 0.9025 },
    '200IM': { 'yards-to-meters': 1.111, 'meters-to-yards': 0.9001 },
    '50Freestyle': { 'yards-to-meters': 1.119, 'meters-to-yards': 0.8937 },
    '100Butterfly': { 'yards-to-meters': 1.114, 'meters-to-yards': 0.8977 },
    '100Freestyle': { 'yards-to-meters': 1.111, 'meters-to-yards': 0.9001 },
    '500Freestyle': { 'yards-to-meters': 0.8780, 'meters-to-yards': 1.1390 },
    '200FreestyleRelay': { 'yards-to-meters': 1.116, 'meters-to-yards': 0.8961 },
    '100Backstroke': { 'yards-to-meters': 1.111, 'meters-to-yards': 0.9001 },
    '100Breaststroke': { 'yards-to-meters': 1.110, 'meters-to-yards': 0.9009 },
    '400FreestyleRelay': { 'yards-to-meters': 1.114, 'meters-to-yards': 0.8977 }
  }
};

// Helper function to convert MM:SS.SS format to seconds
function MMSSSSToSeconds(time) {
  const parts = time.split(':');
  if (parts.length === 1) {
    return parseFloat(parts[0]);
  } else {
    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
  }
}

// Helper function to convert seconds to MM:SS.SS format
function SecondsToMMSSSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);
  if(minutes === 0) {
    return `${remainingSeconds.padStart(5, '0')}`;
  }
  return `${minutes}:${remainingSeconds.padStart(5, '0')}`;
}

// Main function to process the command-line arguments and perform the conversion
function convertTime() {
  const [gender, event, time, conversionType] = process.argv.slice(2);

  if (!conversionFactors[gender] || !conversionFactors[gender][event]) {
    console.log("Invalid gender or event.");
    process.exit(1);
  }

  const factor = conversionFactors[gender][event][conversionType];
  if (!factor) {
    console.log("Invalid conversion type. Use 'yards-to-meters' or 'meters-to-yards'.");
    process.exit(1);
  }

  const timeInSeconds = MMSSSSToSeconds(time);
  const convertedTime = Math.round(100*timeInSeconds * factor)/100;
  const formattedTime = SecondsToMMSSSS(convertedTime);

  const unit = conversionType === 'yards-to-meters' ? 'Meters' : 'Yards';
  console.log(`Converted Time: ${formattedTime} (${unit})`);
}

// Run the function
convertTime();
