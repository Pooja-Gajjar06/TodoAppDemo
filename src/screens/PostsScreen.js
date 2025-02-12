import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, ActivityIndicator, StyleSheet, Alert 
} from 'react-native';
import axios from 'axios';

export default function PostsScreen() {
  const [posts, setPosts] = useState([]);  // Stores fetched posts
  const [loading, setLoading] = useState(true);  // Initial loading
  const [error, setError] = useState(null);  // Handles errors
  const [page, setPage] = useState(1);  // Tracks current page
  const [loadingMore, setLoadingMore] = useState(false);  // Shows bottom loader

  const fetchPosts = async (pageNumber) => {
    const limit = 10; // Fetch 10 posts at a time
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageNumber}`
      );
      if (pageNumber === 1) {
        setPosts(response.data); // First fetch: Replace data
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // Append new data
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load posts. Please try again later.');
      Alert.alert('Error', 'Failed to fetch posts');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(1); // Load first page on mount
  }, []);

  const loadMorePosts = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
      fetchPosts(page + 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4D96FF" />
        <Text style={styles.loadingText}>Loading Posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
          </View>
        )}
        onEndReached={loadMorePosts} // Load more when reaching bottom
        onEndReachedThreshold={0.5} // Load more when 50% of screen is scrolled
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#4D96FF" style={{ marginVertical: 10 }} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  postItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 16,
    color: '#555',
  },
});

