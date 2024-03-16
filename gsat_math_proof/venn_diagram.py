# Import the library
from matplotlib_venn import venn2, venn2_circles, venn2_unweighted
import matplotlib.pyplot as plt

# Create a new figure for the subplots
plt.figure(figsize=(15, 10))

plt.rcParams.update({'font.size': 14})

# Subplot 1: A is a subset of B
plt.subplot(2, 2, 1)
set1_size = 10
set2_size = 20
intersection_size = set1_size  # A is completely inside B
venn = venn2(subsets=(0, set2_size, intersection_size), set_labels = None)
venn.get_label_by_id('10').set_text('')
venn.get_label_by_id('01').set_text('B')
venn.get_label_by_id('11').set_text('A')
plt.title('A is a subset of B', y=0.93)

# Define the set sizes and the intersection size
set1_size = 20
set2_size = 20
intersection_size = 20

# Subplot 2: Intersection of A and B
plt.subplot(2, 2, 2)
venn = venn2(subsets=(set1_size, set2_size, intersection_size))
venn.get_label_by_id('10').set_text('')
venn.get_label_by_id('01').set_text('')
venn.get_label_by_id('11').set_text('A ∩ B')
plt.title('Intersection of A and B', y=0.93)

# Subplot 3: Union of A and B
plt.subplot(2, 2, 3)
venn = venn2(subsets=(set1_size, set2_size, intersection_size))
venn.get_label_by_id('10').set_text('')
venn.get_label_by_id('01').set_text('')
venn.get_label_by_id('11').set_text('A ∪ B')
plt.title('Union of A and B', y=0.93)

# Subplot 4: Difference of A and B
plt.subplot(2, 2, 4)
venn = venn2(subsets=(set1_size, set2_size, intersection_size))
venn.get_label_by_id('10').set_text('A - B')
venn.get_label_by_id('01').set_text('')
venn.get_label_by_id('11').set_text('')
plt.title('Difference of A and B', y=0.93)

plt.tight_layout()

# Save the plot as a PNG image
plt.savefig('./source/_posts/gsat_math_proof/venn_diagram.png')

# Display the plot
plt.show()