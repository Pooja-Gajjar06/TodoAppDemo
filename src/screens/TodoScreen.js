import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function TodoScreen() {
    // Accessing tasks and saveTasks function from TaskContext
    const { tasks, saveTasks } = useContext(TaskContext);
    const [task, setTask] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    // Function to show a toast message
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    // Function to add a new task
    const addTask = () => {
        if (task.trim()) {
            saveTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
            setTask('');
            showToast('Task added!');
        } else {
            showToast('Please enter a task');
        }
    };

    // Function to update an existing task
    const updateTask = () => {
        if (editingTask && task.trim()) {
            saveTasks(tasks.map(t => (t.id === editingTask.id ? { ...t, text: task } : t)));
            setTask('');
            setEditingTask(null);
            showToast('Task updated!');
        }
    };

    // Function to remove a task
    const removeTask = (id) => {
        saveTasks(tasks.filter(t => t.id !== id));
        showToast('Task deleted!');
    };

    // Function to mark a task as completed
    const completeTask = (id) => {
        saveTasks(tasks.map(t => (t.id === id ? { ...t, completed: true } : t)));
        showToast('Task completed!');
    };

    return (
        <View style={styles.container}>
            {/* Input field for entering task */}
            <TextInput
                style={styles.input}
                value={task}
                onChangeText={setTask}
                placeholder="Enter task..."
                placeholderTextColor="#999"
            />

            {/* Buttons for adding/updating and clearing input */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.addButton} onPress={editingTask ? updateTask : addTask}>
                    <Text style={styles.buttonText}>{editingTask ? 'Update' : 'Add'} Task</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={() => setTask('')}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
            </View>

            {/* List of tasks */}
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.text}</Text>
                        <View style={styles.buttonContainer}>
                            {!item.completed && (
                                <TouchableOpacity style={styles.completeButton} onPress={() => completeTask(item.id)}>
                                    <Text style={styles.buttonText}>✔ Complete</Text>
                                </TouchableOpacity>
                            )}
                            {!item.completed && (
                                <TouchableOpacity style={styles.editButton} onPress={() => {
                                    setEditingTask(item);
                                    setTask(item.text);
                                }}>
                                    <Text style={styles.buttonText}>✎ Edit</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(item.id)}>
                                <Text style={styles.buttonText}>✖ Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    addButton: {
        flex: 1,
        backgroundColor: '#6BCB77',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 5,
    },
    clearButton: {
        flex: 1,
        backgroundColor: '#FFB830',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 5,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completeButton: {
        backgroundColor: '#6BCB77',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    editButton: {
        backgroundColor: '#FFD93D',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
