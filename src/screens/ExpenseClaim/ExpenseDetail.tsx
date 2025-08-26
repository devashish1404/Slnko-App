import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Provider, Switch } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DocumentPicker from "@react-native-documents/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { useTab } from "../../store/tabContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_USE_URL } from "@env";
import { getCategoryDescription } from "../../utils/expenseList";

const ExpenseDetail: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();
  const [projectName, setProjectName] = useState("");
  type Project = { code: string; name: string; _id: string };
  const [projectList, setProjectList] = useState<Project[]>([]);

  type Expense = {
    expenseCategory: string;
    billDate: string;
    isBillAvailable: boolean;
    billNumber: string;
    billAmount: string;
    fileName: string;
    remarks: string;
  };

  type Itinerary = {
    state: string;
    projectName: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    expenses: Expense[];
    showMenu: boolean;
  };

  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      state: "",
      projectName: "",
      startDate: undefined,
      endDate: undefined,
      expenses: [
        {
          expenseCategory: "",
          billDate: "",
          isBillAvailable: false,
          billNumber: "",
          billAmount: "",
          fileName: "",
          remarks: "",
        },
      ],
      showMenu: false,
    },
  ]);

  const [dropdownSearch, setDropdownSearch] = useState<string[]>([]);

  useEffect(() => {
    setDropdownSearch((prev) => {
      const arr = [...prev];
      while (arr.length < itineraries.length) arr.push("");
      while (arr.length > itineraries.length) arr.pop();
      return arr;
    });
  }, [itineraries.length]);
  const [showStartPickerIndex, setShowStartPickerIndex] = useState<
    number | null
  >(null);
  const [showEndPickerIndex, setShowEndPickerIndex] = useState<number | null>(
    null
  );

  const handleAddItinerary = () => {
    setItineraries([
      ...itineraries,
      {
        state: "",
        projectName: "",
        startDate: undefined,
        endDate: undefined,
        expenses: [
          {
            expenseCategory: "",
            billDate: "",
            isBillAvailable: false,
            billNumber: "",
            billAmount: "",
            fileName: "",
            remarks: "",
          },
        ],
        showMenu: false,
      },
    ]);
  };

  const handleAddExpense = (itineraryIndex: number) => {
    const updated = [...itineraries];
    updated[itineraryIndex].expenses.push({
      expenseCategory: "",
      billDate: "",
      isBillAvailable: false,
      billNumber: "",
      billAmount: "",
      fileName: "",
      remarks: "",
    });
    setItineraries(updated);
  };

  const handleFilePick = async (
    itineraryIndex: number,
    expenseIndex: number
  ) => {
    try {
      const results = await DocumentPicker.pick();

      if (Array.isArray(results) && results.length > 0) {
        const file = results[0];
        const updated = [...itineraries];
        updated[itineraryIndex].expenses[expenseIndex].fileName =
          file.name ?? "Unnamed File";
        setItineraries(updated);
      }
    } catch (err: any) {
      if (err instanceof Error && err.message.includes("cancel")) {
        console.log("File pick cancelled");
      } else {
        console.error("File pick error:", err);
      }
    }
  };

  const handleRemoveItinerary = (index: number) => {
    const updated = [...itineraries];
    updated.splice(index, 1);
    setItineraries(updated);
  };

  const handleRemoveExpense = (
    itineraryIndex: number,
    expenseIndex: number
  ) => {
    const updated = [...itineraries];
    updated[itineraryIndex].expenses.splice(expenseIndex, 1);
    setItineraries(updated);
  };

  const OTHERS_OPTION = { code: "Others", name: "", _id: null };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const res = await axios.get(`${APP_USE_URL}get-all-projecT-IT`, {
          headers: {
            "x-auth-token": token,
          },
        });
        const projects = Array.isArray(res.data.data) ? res.data.data : [];
        // console.log("projects :", projects);
        setProjectList([...projects, OTHERS_OPTION]);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleCodeChange = (itineraryIndex: number, selectedCode: string) => {
    const updated = [...itineraries];
    updated[itineraryIndex].state = selectedCode;

    const selectedProject = projectList.find(
      (proj) => proj.code === selectedCode
    );
    if (selectedCode === "Others") {
      updated[itineraryIndex].projectName = "";
    } else if (selectedProject) {
      updated[itineraryIndex].projectName = selectedProject.name;
    }

    setItineraries(updated);
  };

  const handleProjectNameChange = (itineraryIndex: number, val: string) => {
    const updated = [...itineraries];
    updated[itineraryIndex].projectName = val;
    setItineraries(updated);
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View style={styles.tabButton}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "request" && styles.activeTab]}
            onPress={() => setActiveTab("request")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "request" && styles.activeTabText,
              ]}
            >
              Expense Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "status" && styles.activeTab]}
            onPress={() => {
              setActiveTab("status");
              // navigation.navigate("ExpenseApprove" as never);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "status" && styles.activeTabText,
              ]}
            >
              Expense Status
            </Text>
          </TouchableOpacity>
        </View>

        {/* Itineraries */}
        {itineraries.map((itinerary, iIdx) => (
          <View key={iIdx} style={styles.itemAdd}>
            {itineraries.length > 1 && (
              <TouchableOpacity
                onPress={() => handleRemoveItinerary(iIdx)}
                style={styles.deleteIcon}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}

            {/* Project Code Dropdown */}
            <Text style={styles.label}>Project Code*</Text>
            <TouchableOpacity
              style={[styles.dropdownButton, styles.input]}
              onPress={() => {
                const updated = [...itineraries];
                updated[iIdx].showMenu = true;
                setItineraries(updated);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  { color: itinerary.state ? "#000" : "#888" },
                ]}
              >
                {itinerary.state || "Select Code"}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#888" />
            </TouchableOpacity>

            {/* Modal */}
            {itinerary.showMenu && (
              <Modal
                transparent
                animationType="fade"
                visible={itinerary.showMenu}
                onRequestClose={() => {
                  const updated = [...itineraries];
                  updated[iIdx].showMenu = false;
                  setItineraries(updated);
                }}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => {
                    const updated = [...itineraries];
                    updated[iIdx].showMenu = false;
                    setItineraries(updated);
                  }}
                >
                  <View style={styles.modalDropdown}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search project code..."
                      value={dropdownSearch[iIdx] || ""}
                      onChangeText={(text) => {
                        const updated = [...dropdownSearch];
                        updated[iIdx] = text;
                        setDropdownSearch(updated);
                      }}
                      autoFocus
                    />
                    <ScrollView keyboardShouldPersistTaps="handled">
                      {[
                        ...projectList.filter(
                          (p) => p.code !== OTHERS_OPTION.code
                        ),
                        OTHERS_OPTION,
                      ]
                        .filter((proj) =>
                          proj.code
                            ?.toLowerCase()
                            .includes(
                              (dropdownSearch[iIdx] || "").toLowerCase()
                            )
                        )
                        .map((proj, index) => (
                          <TouchableOpacity
                            key={proj._id || `proj-${proj.code || index}`}
                            style={styles.dropdownItem}
                            onPress={() => {
                              handleCodeChange(iIdx, proj.code);
                              const updated = [...itineraries];
                              updated[iIdx].showMenu = false;
                              setItineraries(updated);
                              setDropdownSearch((prev) => {
                                const arr = [...prev];
                                arr[iIdx] = "";
                                return arr;
                              });
                            }}
                          >
                            <Text style={styles.dropdownItemText}>
                              {proj.code}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>
            )}

            {/* Project Name Input */}
            <Text style={styles.label}>Project Name*</Text>
            <TextInput
              style={[
                styles.input,
                itinerary.state === "Others" ? {} : { backgroundColor: "#eee" },
              ]}
              placeholder="Enter Project Name"
              value={itinerary.projectName}
              onChangeText={(val) => handleProjectNameChange(iIdx, val)}
              editable={itinerary.state === "Others"}
            />

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Start Date</Text>
                <TouchableOpacity
                  onPress={() => setShowStartPickerIndex(iIdx)}
                  style={styles.input}
                >
                  <Text>
                    {itinerary.startDate
                      ? new Date(itinerary.startDate).toDateString()
                      : "Start Date"}
                  </Text>
                </TouchableOpacity>
                {showStartPickerIndex === iIdx && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      const updated = [...itineraries];
                      updated[iIdx].startDate = date;
                      setItineraries(updated);
                      setShowStartPickerIndex(null);
                    }}
                  />
                )}
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>End Date</Text>
                <TouchableOpacity
                  onPress={() => setShowEndPickerIndex(iIdx)}
                  style={styles.input}
                >
                  <Text>
                    {itinerary.endDate
                      ? new Date(itinerary.endDate).toDateString()
                      : "End Date"}
                  </Text>
                </TouchableOpacity>
                {showEndPickerIndex === iIdx && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      const updated = [...itineraries];
                      updated[iIdx].endDate = date;
                      setItineraries(updated);
                      setShowEndPickerIndex(null);
                    }}
                  />
                )}
              </View>
            </View>

            {/* Add Expense Button */}

            <TouchableOpacity
              onPress={() => handleAddExpense(iIdx)}
              style={styles.addButton}
            >
              <Text style={styles.addtextButton}>Add More Expense</Text>
            </TouchableOpacity>

            {/* Expenses */}
            {itinerary.expenses.map((expense, expenseIndex) => (
              <View key={expenseIndex} style={{ marginTop: 20 }}>
                {itinerary.expenses.length > 1 && (
                  <TouchableOpacity
                    onPress={() => handleRemoveExpense(iIdx, expenseIndex)}
                    style={styles.deleteIcon}
                  >
                    <MaterialIcons name="delete" size={20} color="blue" />
                  </TouchableOpacity>
                )}
                <Text style={styles.label}>Expense Category*</Text>
                <TextInput
                  style={styles.input}
                  value={expense.expenseCategory}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[iIdx].expenses[expenseIndex].expenseCategory = val;
                    setItineraries(updated);
                  }}
                  placeholder="Select Category"
                />
                <Text style={styles.helper}>
                  {getCategoryDescription(expense.expenseCategory)}
                </Text>

                <Text style={styles.label}>Bill Date*</Text>
                <TextInput
                  style={styles.input}
                  value={expense.billDate}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[iIdx].expenses[expenseIndex].billDate = val;
                    setItineraries(updated);
                  }}
                  placeholder="Enter Bill Date"
                />

                <View style={styles.row}>
                  <View style={styles.switch}>
                    <Text style={styles.label}>Is Bill Available*</Text>
                    <Switch
                      value={expense.isBillAvailable}
                      onValueChange={(val) => {
                        const updated = [...itineraries];
                        updated[iIdx].expenses[expenseIndex].isBillAvailable =
                          val;
                        setItineraries(updated);
                      }}
                      thumbColor={expense.isBillAvailable ? "#083c6c" : "#ccc"}
                      trackColor={{ false: "#ccc", true: "#4d8bcf" }}
                    />
                  </View>

                  {expense.isBillAvailable && (
                    <View>
                      <Text style={styles.label}>Bill Number*</Text>
                      <TextInput
                        style={styles.inputBill}
                        value={expense.billNumber}
                        onChangeText={(val) => {
                          const updated = [...itineraries];
                          updated[iIdx].expenses[expenseIndex].billNumber = val;
                          setItineraries(updated);
                        }}
                        placeholder="Enter Bill Number"
                      />
                    </View>
                  )}
                </View>

                <Text style={styles.label}>Bill Amount*</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={expense.billAmount}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[iIdx].expenses[expenseIndex].billAmount = val;
                    setItineraries(updated);
                  }}
                  placeholder="Enter Bill Amount"
                />

                <Text style={styles.label}>Upload File</Text>
                <TouchableOpacity
                  onPress={() => handleFilePick(iIdx, expenseIndex)}
                  style={styles.filePicker}
                >
                  <Text>{expense.fileName || "Choose File"}</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Remarks</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={expense.remarks}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[iIdx].expenses[expenseIndex].remarks = val;
                    setItineraries(updated);
                  }}
                  placeholder="Enter Remarks"
                />
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddItinerary} style={styles.addButton}>
          <Text style={styles.addtextButton}>Add More Itinerary Detail</Text>
        </TouchableOpacity>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Total Requested Amount"
            value={projectName}
            onChangeText={setProjectName}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.button, { backgroundColor: "#1976d2" }]}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              styles.button,
              {
                borderWidth: 1,
                borderColor: "#1976d2",
                backgroundColor: "#fff",
              },
            ]}
          >
            <Text
              style={{
                color: "#1976d2",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Draft
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.button, { backgroundColor: "transparent" }]}
          >
            <Text style={{ color: "#1976d2", textAlign: "center" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default ExpenseDetail;
