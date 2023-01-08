
public struct Sum
{
  public int sum;
  public int element1;
  public int element2;
}

public class Program
{
  public static void Main()
  {
    Console.WriteLine(String.Join(",", MinHeap.SortKSortedArray(new int[] { 5, 4, 3, 2, -100 }, 5)));
    // Console.WriteLine(String.Join(",", ThreeNumberSum(new int[] { 12, 3, 1, 2, -6, 5, -8, 6 }, 0)));
  }
}