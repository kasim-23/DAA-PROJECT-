def bubble_sort(arr):
    n = len(arr)
    steps = []  # Store each step for visualization
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
            steps.append(arr[:])  # Capture state
    return steps

if __name__ == "__main__":
    data = [5, 3, 8, 6, 2, 7]
    steps = bubble_sort(data)
    print("Sorted Array:", data)
    print("Steps for visualization:", steps)
