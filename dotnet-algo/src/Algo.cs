public class Algo
{

  public LinkedList MergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo)
  {
    var listLinkedOne = new List<LinkedList>();
    var listLinkedTwo = new List<LinkedList>();
    var pointer = linkedListOne;
    while (pointer != null)
    {
      listLinkedOne.Insert(0, pointer);
      pointer = pointer.next;
    }
    pointer = linkedListTwo;
    while (pointer != null)
    {
      listLinkedTwo.Insert(0, pointer);
      pointer = pointer.next;
    }
    LinkedList result = null;
    for (var i = 0; i < listLinkedOne.Count && i < listLinkedTwo.Count; i++)
    {
      if (!(listLinkedOne[i].value == listLinkedTwo[i].value))
      {
        break;
      }
      else
      {
        result = listLinkedOne[i];
      }
    }
    return result;
  }

  public static List<int[]> FourNumberSum(int[] array, int targetSum)
  {
    var doubeSumHashMap = new Dictionary<int, List<Sum>>();
    var result = new List<int[]>();
    int remainSum, sum;
    List<Sum> pair;
    for (int i = 1; i < array.Length; i++)
    {
      for (int j = i + 1; j < array.Length; j++)
      {
        remainSum = targetSum - (array[i] + array[j]);
        if (doubeSumHashMap.ContainsKey(remainSum))
        {
          pair = doubeSumHashMap[remainSum];
          pair.ForEach(sum =>
          {
            result.Add(new int[] {
              array[i],
              array[j],
              sum.element1,
              sum.element2
            });
          });
        }
      }
      for (int z = 0; z < i; z++)
      {
        sum = array[i] + array[z];
        if (doubeSumHashMap.ContainsKey(sum))
        {
          doubeSumHashMap[sum].Add(new Sum
          {
            sum = sum,
            element1 = array[i],
            element2 = array[z]
          });
        }
        else
        {
          doubeSumHashMap.Add(sum, new List<Sum>{
            new Sum
              {
                sum = sum,
                element1 = array[i],
                element2 = array[z]
              }
          });
        };
      }
    }
    return result;
  }

  public static List<int[]> ThreeNumberSum(int[] array, int targetSum)
  {
    var sortedList = new List<int>(array);
    sortedList.Sort();
    return new List<int[]>();
  }

  public class LinkedList
  {
    public int value;
    public LinkedList next;

    public LinkedList(int value)
    {
      this.value = value;
      this.next = null;
    }
  }

  public LinkedList SumOfLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo)
  {
    LinkedList pointerOne = linkedListOne.next, pointerTwo = linkedListTwo.next;
    var totalSum = linkedListOne.value + linkedListTwo.value;
    Console.WriteLine((totalSum / 10).ToString() + " " + totalSum % 10);
    var remainder = totalSum / 10;
    var resultLinkedList = new LinkedList(totalSum % 10);
    var resultPointer = resultLinkedList;
    while (pointerOne != null || pointerTwo != null)
    {
      totalSum = ((pointerOne == null ? 0 : pointerOne.value) + (pointerTwo == null ? 0 : pointerTwo.value)) + remainder;
      Console.WriteLine((totalSum / 10).ToString() + " " + totalSum % 10);
      remainder = totalSum / 10;
      resultPointer.next = new LinkedList(totalSum % 10);
      resultPointer = resultPointer.next;
      if (pointerOne != null) pointerOne = pointerOne.next;
      if (pointerTwo != null) pointerTwo = pointerTwo.next;
    }
    if (remainder > 0)
      resultPointer.next = new LinkedList(remainder);
    return resultLinkedList;
  }
  public class BinaryTree
  {
    public int value;
    public BinaryTree left = null;
    public BinaryTree right = null;

    public BinaryTree(int value)
    {
      this.value = value;
    }
  }

  public BinaryTree MergeBinaryTrees(BinaryTree tree1, BinaryTree tree2)
  {
    if (tree1 == null)
    {
      return tree2;
    }
    else if (tree2 == null)
    {
      return tree1;
    }
    var tree = new BinaryTree(tree1.value + tree2.value);
    tree.left = MergeBinaryTrees(tree1.left, tree2.left);
    tree.right = MergeBinaryTrees(tree1.right, tree2.right);
    return tree;
  }

  public bool ZeroSumSubarray(int[] nums)
  {
    var sumMap = new HashSet<int>();
    int sum = 0;
    for (int i = 0; i < nums.Length; i++)
    {
      sum += nums[i];
      if (sum == 0) return true;
      if (!sumMap.Add(sum)) return true;
    }
    return false;
  }
}