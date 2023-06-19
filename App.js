import { StyleSheet, Text, View, Button, Alert } from "react-native"
import { Provider, useSelector, useDispatch } from "react-redux"
import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
	counter: 0,
}

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.counter += 1
		},
		decrement: (state) => {
			if (state.counter === 0) {
				Alert.alert("Aviso", "O contador já está zerado")
			} else {
				state.counter -= 1
			}
			// Usando o ternário para verificar se o valor do contador está em 0, se for true ele não diminui se false ele diminui
			// state.counter = state.counter === 0 ? 0 : state.counter - 1
		},
	},
})

const store = configureStore({
	reducer: counterSlice.reducer,
})

export default function App() {
	return (
		<Provider store={store}>
			<Counter />
		</Provider>
	)
}

function Counter() {
	const counter = useSelector((state) => state.counter)
	const dispatch = useDispatch()

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Counter: {counter}</Text>
			<View style={styles.button}>
				<Button
					title="Increment +"
					color="#f6f6"
					onPress={() => dispatch(counterSlice.actions.increment())}
				/>
				<Button
					title="Decrement -"
					color="#f6f6"
					onPress={() => dispatch(counterSlice.actions.decrement())}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 40,
		fontWeight: "bold",
		color: "#38bdf8",
		marginBottom: 50,
	},
	button: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		gap: 30,
	},
})
