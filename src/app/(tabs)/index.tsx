import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function HomeScreen() {
  const {
    control,
    handleSubmit, watch,
  } =  useForm<{ name: string; email: string }>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
            />
            {error ? (
              <Text style={styles.error}>{error.message as string}</Text>
            ) : null}
          </>
        )}
      />
       <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" , pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
            {error ? (
              <Text style={styles.error}>{error.message as string}</Text>
            ) : null}
          </>
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Text>Name: {watch("name")}</Text>
      <Text>Email: {watch("email")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
    fontSize: 14,
  },
});
