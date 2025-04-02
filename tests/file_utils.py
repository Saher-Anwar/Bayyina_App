def find_longest_ism_in_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        longest = ""
        location = ""

        for line in lines:
            segments = line.split()

            if len(segments) < 3:
                print(segments)
            if segments[2] != "N":
                continue

            if len(segments[3]) > len(longest):
                longest = segments[3]
                location = segments[0]
        
        print(location)
        return longest
    
def find_label(file_path, label):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        
        for line in lines:
            segments = line.split()

            if segments[2] != "N":
                continue
            
            if label in segments[3]:
                # get the label from segments
                start_index = segments[3].find(label)
                if segments[3][start_index-2:start_index + len(label)] == "INDEF":
                    print(line)
                    continue
                else:
                    print(line)
                    break
        
if __name__ == "__main__":
    file_path = "quran-morphology.txt"
    find_label(file_path, "DEF")