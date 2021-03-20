def sort_recursive(array, begin, end):
    print(f"[\"A\", \"{array}\", \"/\", \"/\", \"/\", 2],")
    if end - begin < 1:
        print(f"[\"B\", \"{array}\", \"/\", \"/\", \"/\", 3],")
        return
    
    up = begin
    down = end
    pivot = array[(begin + end)//2]
    print(f"[\"C\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", [5,6,7]],")
    
    print(f"[\"D\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 9],")
    while up < down:
        print(f"[\"E\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 10],")
        while up <= end and pivot > array[up]:
            up += 1
            print(f"[\"F\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 11],")
        print(f"[\"G\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 12],")
        while down >= 0 and array[down] > pivot:
            down -= 1
            print(f"[\"H\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 13],")
    
        print(f"[\"I\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 15],")
        if up <= down:
            array[up], array[down] = array[down], array[up]
            up += 1
            down -= 1
            print(f"[\"J\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", [16,17,18]],")
    
    print(f"[\"K\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 20],")
    sort_recursive(array, begin, up - 1)
    print(f"[\"L\", \"{array}\", \"{pivot}\", \"{up}\", \"{down}\", 21],")
    sort_recursive(array, up, end)



array = [1,2,3,4,5,6,7,8,9,10]

print(f"Before: {array}")
sort_recursive(array, 0, len(array) - 1)
print(f"After:  {array}")
