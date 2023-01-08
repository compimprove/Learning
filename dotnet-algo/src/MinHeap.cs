public static class MinHeap
{

  public static int[] SortKSortedArray(int[] array, int k)
  {
    if (array.Length == 0 || array.Length == 1) return array;
    var list = new List<int>(array);
    var result = new List<int>();
    int left = 0, right = Math.Min(k, array.Length - 1);
    buildHeap(list, left, right);
    Console.WriteLine("BuildHeap " + String.Join(",", list));
    for (int i = 0; right + i + 1 < list.Count; i++)
    {
      result.Add(list[left]);
      Swap(list, left, right + i + 1);
      Console.WriteLine("Swap " + String.Join(",", list));
      sifDown(left, right, list);
      Console.WriteLine("sifDown " + String.Join(",", list));
    }
    while (left < right)
    {
      list.Add(list[left]);
      Console.WriteLine("add " + String.Join(",", list));
      result.Add(list[left]);
      Swap(list, left, right);
      right--;
      sifDown(left, right, list);
    }
    result.Add(list[left]);
    Console.WriteLine("result " + String.Join(",", result));
    return result.ToArray();
  }

  public static List<int> buildHeap(List<int> array, int firstIdx = 0, int endIdx = -1)
  {
    if (endIdx == -1) endIdx = array.Count - 1;
    var first = (endIdx - 1) / 2;
    for (int i = first; i >= firstIdx; i--)
    {
      sifDown(i, endIdx, array);
    }
    return array;
  }

  private static void siftUp(int currentIdx, int topIdx, List<int> heap)
  {
    var parentIdx = (currentIdx - 1) / 2;
    while (currentIdx >= topIdx && heap[parentIdx] > heap[currentIdx])
    {
      Swap(heap, parentIdx, currentIdx);
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  private static void sifDown(int currentIdx, int endIdx, List<int> heap)
  {
    var leftChild = (currentIdx * 2) + 1;
    while (leftChild <= endIdx)
    {
      var rightChild = currentIdx * 2 + 2 <= endIdx ? (currentIdx * 2 + 2) : -1;
      var indexToSwap = leftChild;
      if (rightChild != -1 && heap[leftChild] > heap[rightChild])
      {
        indexToSwap = rightChild;
      }
      if (heap[indexToSwap] < heap[currentIdx])
      {
        Swap(heap, indexToSwap, currentIdx);
        currentIdx = indexToSwap;
        leftChild = currentIdx * 2 + 1;
      }
      else
      {
        return;
      }
    }
  }

  private static void Swap(List<int> heap, int idx1, int idx2)
  {
    int temp = heap[idx1];
    heap[idx1] = heap[idx2];
    heap[idx2] = temp;
  }
}