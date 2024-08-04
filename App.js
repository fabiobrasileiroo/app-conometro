import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [isEnable, setIsEnable] = useState(false);
  const [conometro, setConometro] = useState(0.0);
  const [botao, setBotao] = useState("Vai");
  const [ultimo, setUltimo] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    console.log("mudança aqui");
    if (isEnable) {
      intervalRef.current = setInterval(() => {
        setConometro((prev) => parseFloat((prev + 0.1).toFixed(1)));
      }, 100); // Atualiza a cada 100ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Limpeza do intervalo quando o componente desmonta
    return () => clearInterval(intervalRef.current);
  }, [isEnable]);

  const vai = () => {
    setBotao("Parar");
    setIsEnable(true);
    if (isEnable) {
      setIsEnable(false);
      setBotao("Vai");
    }
  };

  const limpar = () => {
    setIsEnable(false);
    setUltimo(conometro);
    setConometro(0);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/cronometro.png")}
        style={styles.conometro}
      />
      <Text style={styles.timer}>{conometro.toFixed(1)}</Text>
      <StatusBar style="auto" />

      <View style={styles.btnArea}>
        <View style={styles.btn}>
          <TouchableOpacity onPress={vai} style={styles.botao}>
            <Text style={styles.btnTexto}>{botao}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity onPress={limpar} style={styles.botao}>
            <Text style={styles.btnTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.areaUltima}>
        {ultimo !== null ? (
          <Text style={styles.ultimoTexto}>
            Ultimo tempo: {ultimo.toFixed(1)}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00aeef",
    alignItems: "center",
    justifyContent: "center",
  },
  conometro: {},
  timer: {
    marginTop: -160,
    color: "#FFF",
    fontSize: 65,
    fontWeight: "bold",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 70,
    height: 40,
    gap: 8,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 40,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  areaUltima: {
    marginTop: 40,
  },
  ultimoTexto: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
});
