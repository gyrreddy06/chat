import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Heart, ThumbsUp, Smile, Sparkles, X, Check } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

type MessageType = 'text' | 'image' | 'video' | 'voice';
type ReactionType = 'heart' | 'thumbsUp' | 'smile' | 'sparkles' | string;

type Reaction = {
  type: ReactionType;
  count: number;
};

type ChatBubbleProps = {
  message: string;
  time: string;
  type: MessageType;
  isOwn: boolean;
  reactions?: Reaction[];
  mediaUrl?: string;
  read?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  time,
  type,
  isOwn,
  reactions = [],
  mediaUrl,
  read = false,
  onPress,
  onLongPress,
}) => {
  const { colors } = useTheme();

  const renderReactionIcon = (reactionType: ReactionType) => {
    switch (reactionType) {
      case 'heart':
        return <Heart size={14} color="white" fill="white" />;
      case 'thumbsUp':
        return <ThumbsUp size={14} color="white" fill="white" />;
      case 'smile':
        return <Smile size={14} color="white" fill="white" />;
      case 'sparkles':
        return <Sparkles size={14} color="white" />;
      default:
        return <Text style={styles.emojiReaction}>{reactionType}</Text>;
    }
  };

  const renderMessageContent = () => {
    switch (type) {
      case 'image':
        return (
          <View style={styles.mediaContainer}>
            <Image
              source={{ uri: mediaUrl }}
              style={styles.mediaImage}
              resizeMode="cover"
            />
            {message && <Text style={[styles.messageText, { color: colors.text.primary }]}>{message}</Text>}
          </View>
        );
      case 'video':
        return (
          <View style={styles.mediaContainer}>
            <View style={[styles.videoPlaceholder, { backgroundColor: colors.dark.surface }]}>
              {/* Placeholder for video thumbnail */}
              <Text style={{ color: colors.text.secondary }}>Video</Text>
            </View>
            {message && <Text style={[styles.messageText, { color: colors.text.primary }]}>{message}</Text>}
          </View>
        );
      case 'voice':
        return (
          <View style={[styles.voiceContainer, { backgroundColor: colors.dark.surface }]}>
            <View style={styles.waveform}>
              {[...Array(15)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.waveformBar, 
                    { 
                      height: 5 + Math.random() * 15,
                      backgroundColor: isOwn ? colors.primary.pink : colors.primary.blue
                    }
                  ]} 
                />
              ))}
            </View>
            <Text style={[styles.voiceDuration, { color: colors.text.secondary }]}>0:42</Text>
          </View>
        );
      default:
        return <Text style={[styles.messageText, { color: colors.text.primary }]}>{message}</Text>;
    }
  };

  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : {}]}>
      <Pressable
        style={[
          styles.bubble,
          isOwn
            ? [styles.ownBubble, { backgroundColor: colors.primary.blue }]
            : { backgroundColor: colors.dark.card },
          type === 'image' && styles.imageBubble,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {renderMessageContent()}
        <View style={styles.timeContainer}>
          <Text
            style={[
              styles.timeText,
              { color: isOwn ? 'rgba(255,255,255,0.7)' : colors.text.muted },
            ]}
          >
            {time}
          </Text>
          {isOwn && (
            <View style={styles.readStatus}>
              {read ? (
                <Check size={14} color="rgba(255,255,255,0.7)" />
              ) : (
                <Check size={14} color="rgba(255,255,255,0.4)" />
              )}
            </View>
          )}
        </View>
      </Pressable>

      {reactions.length > 0 && (
        <View
          style={[
            styles.reactionsContainer,
            isOwn ? styles.ownReactionsContainer : {},
            { backgroundColor: colors.dark.surface },
          ]}
        >
          {reactions.map((reaction, index) => (
            <View
              key={index}
              style={[
                styles.reactionBubble,
                { backgroundColor: colors.primary.blue },
              ]}
            >
              {renderReactionIcon(reaction.type)}
              {reaction.count > 1 && (
                <Text style={styles.reactionCount}>{reaction.count}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.xs,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  ownContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  ownBubble: {
    borderBottomRightRadius: Theme.spacing.xs,
  },
  imageBubble: {
    padding: Theme.spacing.xs,
    overflow: 'hidden',
  },
  messageText: {
    fontFamily: Theme.typography.fontFamily.secondary.regular,
    fontSize: Theme.typography.fontSize.md,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Theme.spacing.xs,
  },
  timeText: {
    fontSize: Theme.typography.fontSize.xs,
    marginRight: Theme.spacing.xs,
  },
  readStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -10,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: Theme.spacing.xs / 2,
    borderRadius: Theme.borderRadius.pill,
    left: 10,
  },
  ownReactionsContainer: {
    right: 10,
    left: undefined,
  },
  reactionBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.borderRadius.pill,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: 2,
    marginRight: 4,
  },
  reactionCount: {
    color: 'white',
    fontSize: 10,
    marginLeft: 2,
    fontFamily: Theme.typography.fontFamily.primary.bold,
  },
  mediaContainer: {
    overflow: 'hidden',
  },
  mediaImage: {
    width: 200,
    height: 150,
    borderRadius: Theme.borderRadius.sm,
    marginBottom: Theme.spacing.xs,
  },
  videoPlaceholder: {
    width: 200,
    height: 150,
    borderRadius: Theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  voiceContainer: {
    width: 200,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 30,
    justifyContent: 'space-between',
  },
  waveformBar: {
    width: 3,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  voiceDuration: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.typography.fontSize.xs,
    alignSelf: 'flex-end',
  },
  emojiReaction: {
    fontSize: 12,
  }
});

export default ChatBubble;