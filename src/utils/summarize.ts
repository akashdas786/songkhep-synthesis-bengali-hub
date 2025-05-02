
// This is a placeholder for a real summarization API
export const summarizeText = async (text: string, level: number = 3): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demonstration purposes, we'll just return a shortened version
  // In a real app, this would call an actual summarization API
  const sentences = text.split('।').filter(s => s.trim().length > 0);
  
  if (sentences.length <= 1) {
    return text;
  }
  
  // Return the first sentence and approximately (30% / level) of the remaining sentences
  // Higher level means more summarization (fewer sentences)
  const firstSentence = sentences[0];
  const remainingSentences = sentences.slice(1);
  
  // Calculate how many sentences to take based on summarization level
  const compressionFactor = 0.3 / (level / 3);
  const samplesToTake = Math.max(1, Math.floor(remainingSentences.length * compressionFactor));
  
  const selectedSentences = [
    firstSentence,
    ...remainingSentences.slice(0, samplesToTake)
  ];
  
  return selectedSentences.join('।') + '।';
};
