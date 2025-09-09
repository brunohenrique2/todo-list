import usersData from "./users.json"
import tasksData from "./tasks.json"
import taskGroupsData from "./taskGroups.json"
import preferencesData from "./preferences.json"

export function Memory() {

    function getUsers() {
        return userData
    }

    function getTasks() {
        return taskData
    }

    function getTaskGroups() {
        return taskGroupData
    }

    function getPreferences() {
        return preferenceData
    }
}