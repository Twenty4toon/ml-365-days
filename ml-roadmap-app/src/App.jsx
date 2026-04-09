import { useState, useEffect, useRef } from 'react'
import './App.css'
import { useRive, useStateMachineInput } from 'rive-react'

const roadmap = [
  {
    id: 1, label: "M1–2", title: "Python + Math", color: "#4A9EFF",
    weeks: [
      { id:"1-1", range:"Week 1–2", days:"Days 1–14", title:"Python Mastery", days_data:[
        {d:1,t:"Setup + Basics","desc":"Install Python, VS Code, pip. Variables, data types (int, float, str, bool), print()."},
        {d:2,t:"Strings","desc":"String methods: upper, lower, split, join, replace, strip. f-strings and string formatting."},
        {d:3,t:"Lists + Tuples","desc":"Create, index, slice, iterate. List methods: append, pop, sort, reverse. Tuple immutability."},
        {d:4,t:"Dicts + Sets","desc":"Dictionary CRUD, iteration, .get(), .items(). Sets: union, intersection, difference."},
        {d:5,t:"Conditionals","desc":"if/elif/else, comparison operators (==, !=, >, <), logical operators (and, or, not)."},
        {d:6,t:"Loops","desc":"for loops with range(). while loops. break, continue, pass. Nested loops."},
        {d:7,t:"Practice Day","desc":"Solve 5 beginner problems on HackerRank or Exercism. Review Days 1–6."},
        {d:8,t:"Functions","desc":"def, parameters, default args, *args, **kwargs, return values. Scope (local vs global)."},
        {d:9,t:"OOP Part 1","desc":"Classes, __init__, instance methods, self keyword. Create a Car or BankAccount class."},
        {d:10,t:"OOP Part 2","desc":"Inheritance, super(), method overriding, polymorphism. Abstract concept of encapsulation."},
        {d:11,t:"File I/O","desc":"open(), read, write, append modes. with statement. Reading/writing CSV files manually."},
        {d:12,t:"Error Handling","desc":"try/except/else/finally. Common exceptions (ValueError, TypeError, FileNotFoundError). raise."},
        {d:13,t:"Modules + pip","desc":"import, from x import y, __name__. pip install. Virtual environments with venv."},
        {d:14,t:"Mini Project","desc":"Build a CLI contact book app: add, list, search, delete contacts. Save to file. Push to GitHub."},
      ]},
      { id:"1-2", range:"Week 3–4", days:"Days 15–28", title:"NumPy, Pandas, Matplotlib", days_data:[
        {d:15,t:"NumPy Arrays","desc":"np.array(), dtype, shape, ndim. Creating arrays: zeros, ones, arange, linspace, random."},
        {d:16,t:"NumPy Operations","desc":"Indexing, slicing (1D, 2D). Broadcasting rules. Vectorized math — no loops needed."},
        {d:17,t:"NumPy Advanced","desc":"reshape, flatten, stack, concatenate. np.dot(), np.linalg basics, random seeding."},
        {d:18,t:"Pandas Series + DF","desc":"pd.Series, pd.DataFrame creation. Loading CSV with pd.read_csv(). .head(), .info(), .describe()."},
        {d:19,t:"Pandas Indexing","desc":"loc (label-based), iloc (integer-based). Boolean filtering. Selecting columns."},
        {d:20,t:"Pandas Aggregation","desc":"groupby(), agg(), pivot_table(). Sorting with sort_values(). value_counts()."},
        {d:21,t:"Practice EDA","desc":"Load Titanic dataset from Kaggle. Explore shape, nulls, value distributions. Write observations."},
        {d:22,t:"Pandas Merge/Join","desc":"pd.merge(), pd.concat(), .join(). Inner, outer, left, right joins explained."},
        {d:23,t:"Handling Missing Data","desc":"isnull(), fillna(), dropna(), interpolate(). Strategy: when to fill vs drop."},
        {d:24,t:"Matplotlib Basics","desc":"plt.plot(), bar(), scatter(), hist(). Titles, labels, legends, figure size, saving."},
        {d:25,t:"Seaborn","desc":"sns.heatmap (correlation), pairplot, boxplot, violinplot, countplot. Styling tips."},
        {d:26,t:"EDA Project Start","desc":"Pick any Kaggle dataset. Full EDA: shape, dtypes, nulls, distributions, correlations."},
        {d:27,t:"EDA Project Finish","desc":"Visualize 5+ insights from your dataset. Write a short findings summary in the notebook."},
        {d:28,t:"GitHub Push","desc":"Clean your notebook. Add README to repo explaining the dataset + findings. Push to GitHub."},
      ]},
      { id:"1-3", range:"Week 5–6", days:"Days 29–42", title:"Linear Algebra", days_data:[
        {d:29,t:"Vectors","desc":"What is a vector? Magnitude, direction. Vector addition, scalar multiplication, dot product."},
        {d:30,t:"Matrices Basics","desc":"Matrix as a grid of numbers. Addition, subtraction. Scalar multiplication."},
        {d:31,t:"Matrix Multiplication","desc":"Rules for multiplying matrices. Why AB ≠ BA. Practical example in NumPy."},
        {d:32,t:"Identity + Inverse","desc":"Identity matrix (I). Matrix inverse — when it exists. Solving Ax=b."},
        {d:33,t:"3B1Brown Videos 1–3","desc":"Watch: Chapter 1–3 of Essence of Linear Algebra. Take written notes with your own examples."},
        {d:34,t:"Eigenvalues / Vectors","desc":"What eigenvalues and eigenvectors mean geometrically. np.linalg.eig(). Why ML uses them."},
        {d:35,t:"Practice + Review","desc":"Implement dot product, matrix mul, transpose from scratch using only lists (no NumPy)."},
        {d:36,t:"3B1Brown Videos 4–7","desc":"Watch: Chapters 4–7. Focus on determinants, change of basis. Write key intuitions."},
        {d:37,t:"SVD Intuition","desc":"Singular Value Decomposition — what it is conceptually. How it underpins PCA and recommendations."},
        {d:38,t:"PCA Intuition","desc":"Principal Component Analysis — reducing dimensions while preserving variance. Step-by-step breakdown."},
        {d:39,t:"NumPy Linear Algebra","desc":"np.linalg.inv(), det(), eig(), svd(), solve(). Run each on real matrices."},
        {d:40,t:"Implement From Scratch","desc":"Code matrix multiplication from scratch. Code a simple PCA step manually using NumPy (no sklearn)."},
        {d:41,t:"Geometric Intuition","desc":"3B1Brown final chapters. Draw diagrams of transformations. How does rotation/scaling look as a matrix?"},
        {d:42,t:"Review + Quiz","desc":"Write 10 questions and answer them yourself: dot product, inverse, eigenvalues, SVD, PCA."},
      ]},
      { id:"1-4", range:"Week 7–8", days:"Days 43–56", title:"Calculus + Stats + Probability", days_data:[
        {d:43,t:"Derivatives","desc":"What is a derivative? Basic rules: power, product, chain rule. Intuition: rate of change."},
        {d:44,t:"Partial Derivatives","desc":"Functions of multiple variables. ∂f/∂x, ∂f/∂y. This is the math behind weight updates in NNs."},
        {d:45,t:"Gradient Descent","desc":"Gradient = direction of steepest increase. Gradient descent = walk opposite. Visualize with a bowl."},
        {d:46,t:"Stats Basics","desc":"Khan Academy: Mean, median, mode. Range, variance, standard deviation. Calculate for a dataset."},
        {d:47,t:"Normal Distribution","desc":"Bell curve, 68–95–99.7 rule. Z-scores. Why most ML assumptions rely on normality."},
        {d:48,t:"Probability Basics","desc":"Sample space, events, probability axioms. P(A and B), P(A or B). Venn diagrams."},
        {d:49,t:"Review Day","desc":"Revisit gradient descent with code (NumPy). Quiz: derivatives, z-score, probability rules."},
        {d:50,t:"Conditional Probability","desc":"P(A|B). Bayes' theorem. Practical example: spam filter, disease test. Solve 5 Bayes problems."},
        {d:51,t:"Distributions Part 1","desc":"Bernoulli (coin flip). Binomial (k successes in n trials). PMF, expected value, variance."},
        {d:52,t:"Distributions Part 2","desc":"Poisson (rare events). Normal/Gaussian. When to use which. scipy.stats in code."},
        {d:53,t:"Hypothesis Testing","desc":"Null hypothesis, alternative hypothesis, p-value, significance level (α). Type 1 & 2 errors."},
        {d:54,t:"Confidence + Correlation","desc":"Confidence intervals. Pearson correlation. Correlation ≠ causation (examples)."},
        {d:55,t:"Stats on Real Data","desc":"Apply everything: load a Kaggle dataset, compute all stats, plot distributions, test hypotheses."},
        {d:56,t:"Phase 1 Review","desc":"Fill any weak areas. Push all code to GitHub. Write a LinkedIn post: 'Week 8 done — here's what I learned.'"},
      ]},
    ]
  },
  {
    id: 2, label: "M3–4", title: "ML Fundamentals", color: "#A78BFA",
    weeks: [
      { id:"2-1", range:"Week 9–10", days:"Days 57–70", title:"Supervised Learning", days_data:[
        {d:57,t:"ML Overview","desc":"Types of ML: supervised, unsupervised, RL. The ML workflow: data → model → evaluate → deploy."},
        {d:58,t:"Linear Regression Theory","desc":"Line of best fit. Cost function (MSE). Gradient descent to minimize cost. Closed-form solution."},
        {d:59,t:"Linear Regression Code","desc":"Implement linear regression from scratch with NumPy. Then compare with sklearn LinearRegression."},
        {d:60,t:"Sklearn Workflow","desc":"fit(), predict(), score(). Train on Boston Housing. Understand the sklearn estimator pattern."},
        {d:61,t:"Logistic Regression","desc":"Binary classification. Sigmoid function. Output as probability. Decision boundary concept."},
        {d:62,t:"Logistic Code + Titanic","desc":"sklearn LogisticRegression on Titanic dataset. Feature prep, fit, predict, accuracy."},
        {d:63,t:"Practice: Classification","desc":"Try 3 classifiers on the same dataset. Compare accuracy. Which performs best and why?"},
        {d:64,t:"Decision Trees Theory","desc":"How splits are chosen (Gini impurity, entropy, information gain). Tree depth and leaves."},
        {d:65,t:"Decision Trees Code","desc":"sklearn DecisionTreeClassifier. Visualize the tree with plot_tree(). Tune max_depth."},
        {d:66,t:"Random Forest","desc":"Bagging: train many trees on random subsets. Aggregate predictions. feature_importances_."},
        {d:67,t:"SVM","desc":"Hyperplane, margin, support vectors. Kernel trick for non-linear data. sklearn SVC."},
        {d:68,t:"KNN","desc":"K-Nearest Neighbors: find K closest points. Distance metrics (Euclidean, Manhattan). Choosing K."},
        {d:69,t:"Algorithm Comparison","desc":"Run all 5 algorithms on one dataset. Build a comparison table: accuracy, speed, interpretability."},
        {d:70,t:"Mini Project","desc":"Pick any classification dataset (UCI repo). Apply best model, tune, evaluate. Push to GitHub."},
      ]},
      { id:"2-2", range:"Week 11–12", days:"Days 71–84", title:"Model Evaluation", days_data:[
        {d:71,t:"Train/Val/Test Split","desc":"Why split data. train_test_split(). Data leakage — what it is and why it destroys models."},
        {d:72,t:"Cross-Validation","desc":"K-fold CV. Stratified K-fold for imbalanced classes. cross_val_score() in sklearn."},
        {d:73,t:"Accuracy + Precision/Recall","desc":"When accuracy misleads (imbalanced classes). Precision = not crying wolf. Recall = finding all positives."},
        {d:74,t:"F1 + Confusion Matrix","desc":"F1 score — harmonic mean. Confusion matrix: TP, TN, FP, FN. sns.heatmap visualization."},
        {d:75,t:"AUC-ROC","desc":"ROC curve — TPR vs FPR at different thresholds. AUC = area under curve. What 0.5 vs 0.9 means."},
        {d:76,t:"Regression Metrics","desc":"RMSE, MAE, R². When to use which. Visualizing residuals (actual vs predicted plot)."},
        {d:77,t:"Metrics Practice","desc":"Pick 3 datasets. Compute all relevant metrics for each. Write a cheat sheet."},
        {d:78,t:"Bias-Variance Tradeoff","desc":"High bias = underfitting. High variance = overfitting. The sweet spot. Visualize with learning curves."},
        {d:79,t:"Regularization L1/L2","desc":"Lasso (L1) — zeros out features. Ridge (L2) — shrinks weights. sklearn Lasso, Ridge classes."},
        {d:80,t:"Elastic Net","desc":"Combines L1 + L2. When to use. Alpha, l1_ratio hyperparameters. Fit on regression dataset."},
        {d:81,t:"GridSearchCV","desc":"Exhaustive hyperparameter search. Define param_grid, run GridSearchCV, extract best_params_."},
        {d:82,t:"RandomizedSearchCV","desc":"Faster than grid search for large spaces. scipy.stats distributions for params. Early stopping concept."},
        {d:83,t:"Learning Curves","desc":"Plot training vs validation score vs training size. Diagnose: more data? More complexity? Regularize?"},
        {d:84,t:"Full Pipeline Project","desc":"Build complete ML pipeline: load → clean → encode → scale → model → tune → evaluate. Push to GitHub."},
      ]},
      { id:"2-3", range:"Week 13–14", days:"Days 85–98", title:"Unsupervised Learning", days_data:[
        {d:85,t:"Clustering Overview","desc":"What is clustering? Real use cases: customer segments, anomaly detection, topic modeling."},
        {d:86,t:"K-Means Theory","desc":"Algorithm: assign → update centroids → repeat. Inertia. Elbow method to choose K."},
        {d:87,t:"K-Means Code","desc":"sklearn KMeans. Fit on 2D data. Visualize clusters with matplotlib. Try different K values."},
        {d:88,t:"DBSCAN","desc":"Density-based clustering. Core points, border points, noise. Handles arbitrary shapes. No need to choose K."},
        {d:89,t:"Hierarchical Clustering","desc":"Agglomerative bottom-up approach. Dendrogram visualization. scipy.cluster.hierarchy."},
        {d:90,t:"Why Reduce Dimensions","desc":"Curse of dimensionality. Visualization challenges. How reduction helps clustering and viz."},
        {d:91,t:"PCA in Practice","desc":"sklearn PCA. Explained variance ratio. Reduce 100 features → 2D, plot, see structure."},
        {d:92,t:"t-SNE","desc":"Non-linear dimensionality reduction. Great for visualization. sklearn TSNE. Perplexity parameter."},
        {d:93,t:"UMAP","desc":"Faster + better than t-SNE for large datasets. umap-learn library. Compare vs t-SNE visually."},
        {d:94,t:"Anomaly Detection","desc":"Isolation Forest — isolating outliers. Local Outlier Factor (LOF). Use case: fraud, sensor faults."},
        {d:95,t:"Project: Customer Segmentation","desc":"Use a retail/e-commerce dataset. K-Means + PCA for visualization. Describe each segment."},
        {d:96,t:"Project: Insights","desc":"Go deeper — what does each cluster mean? What business action would you take per segment?"},
        {d:97,t:"Project: Polish","desc":"Clean notebook, add markdown cells, visualizations. Write a 5-sentence summary of findings."},
        {d:98,t:"GitHub + LinkedIn","desc":"Push project to GitHub with README. Write a LinkedIn post explaining what you discovered."},
      ]},
      { id:"2-4", range:"Week 15–16", days:"Days 99–112", title:"Feature Engineering + Kaggle", days_data:[
        {d:99,t:"Feature Encoding","desc":"Label Encoding vs One-Hot Encoding vs Target Encoding. When to use which. Ordinal data."},
        {d:100,t:"Feature Scaling","desc":"StandardScaler (z-score), MinMaxScaler, RobustScaler. Which models need scaling?"},
        {d:101,t:"Handling Missing Data","desc":"Mean/median/mode imputation. KNN imputer. Indicator columns for missingness. MCAR vs MAR vs MNAR."},
        {d:102,t:"Class Imbalance","desc":"SMOTE oversampling. class_weight='balanced'. Undersampling. Choosing the right strategy."},
        {d:103,t:"Feature Selection","desc":"Correlation heatmap. SelectKBest (chi2, f_classif). Recursive Feature Elimination (RFE)."},
        {d:104,t:"sklearn Pipelines","desc":"Pipeline() to chain transformers + model. ColumnTransformer for different column types. No leakage."},
        {d:105,t:"Pipeline Practice","desc":"Build a Pipeline for a real dataset: impute → encode → scale → model. Cross-validate the whole pipeline."},
        {d:106,t:"Kaggle Competition 1: EDA","desc":"Join any Kaggle competition. Download data. Do full EDA — understand the problem deeply."},
        {d:107,t:"Kaggle Comp 1: Baseline","desc":"Build simplest baseline model. Submit. Get your first score on the leaderboard."},
        {d:108,t:"Kaggle Comp 1: Improve","desc":"Feature engineering improvements. Try Random Forest + XGBoost. Tune, resubmit, compare scores."},
        {d:109,t:"Kaggle Competition 2","desc":"Join a second competition (different type). EDA + baseline in one session."},
        {d:110,t:"Kaggle Comp 2: Improve","desc":"Apply lessons from comp 1. Better feature engineering. Ensemble if possible."},
        {d:111,t:"End-to-End Project","desc":"Real problem → collect data → clean → feature eng → model → evaluate → conclusions. All in one notebook."},
        {d:112,t:"Phase 2 Review","desc":"Push all code to GitHub. Update LinkedIn with 2-month progress. Plan Phase 3 deep learning start."},
      ]},
    ]
  },
  {
    id: 3, label: "M5–6", title: "Deep Learning", color: "#34D399",
    weeks: [
      { id:"3-1", range:"Week 17–18", days:"Days 113–126", title:"Neural Nets + PyTorch", days_data:[
        {d:113,t:"What Are Neural Nets","desc":"Biological neuron analogy. Perceptron. Layer structure: input → hidden → output."},
        {d:114,t:"Activation Functions","desc":"ReLU (most common), Sigmoid, Tanh, Softmax. When to use each. Dead ReLU problem."},
        {d:115,t:"Forward Propagation","desc":"Matrix multiplication through layers. How a prediction is made. Manual example with numbers."},
        {d:116,t:"Backpropagation","desc":"Chain rule applied to layers. How gradients flow backward. This is how the model learns."},
        {d:117,t:"Optimizers","desc":"SGD with momentum. Adam (Adaptive Moment Estimation) — most widely used. Learning rate concept."},
        {d:118,t:"PyTorch Setup","desc":"Install PyTorch. torch.tensor basics. Operations, reshaping, GPU check (torch.cuda.is_available())."},
        {d:119,t:"PyTorch Autograd","desc":"requires_grad=True. .backward(). .grad. How PyTorch tracks operations for automatic differentiation."},
        {d:120,t:"nn.Module Basics","desc":"Inherit nn.Module. __init__ and forward(). nn.Linear, nn.ReLU, nn.Sigmoid as building blocks."},
        {d:121,t:"Build First MLP","desc":"2-layer MLP for binary classification. nn.Sequential shortcut. Understand weight shapes."},
        {d:122,t:"Training Loop","desc":"The loop: forward pass → compute loss → loss.backward() → optimizer.step() → zero_grad()."},
        {d:123,t:"Loss Functions","desc":"nn.MSELoss (regression), nn.CrossEntropyLoss (multi-class), nn.BCELoss (binary). Pick correctly."},
        {d:124,t:"DataLoader","desc":"torch Dataset class. DataLoader for batching, shuffling. Why batches > one sample at a time."},
        {d:125,t:"Train on MNIST","desc":"Load MNIST via torchvision. Build MLP. Train 5 epochs. Evaluate. Visualize some predictions."},
        {d:126,t:"Evaluate MNIST","desc":"Accuracy per class. Confusion matrix for MNIST. Where does the model fail?"},
      ]},
      { id:"3-2", range:"Week 19–20", days:"Days 127–140", title:"CNNs", days_data:[
        {d:127,t:"Convolution Operation","desc":"Filter/kernel sliding over image. Feature map output. Stride and padding effects on output size."},
        {d:128,t:"Pooling Layers","desc":"Max pooling, average pooling. Why they reduce spatial size. Translation invariance."},
        {d:129,t:"CNN Architecture","desc":"Stack: [Conv → ReLU → Pool] × N → Flatten → FC layers. Common pattern for image tasks."},
        {d:130,t:"Build CNN for CIFAR-10","desc":"3-class or full 10-class CIFAR. Build, train, evaluate. Compare with MLP baseline."},
        {d:131,t:"Batch Normalization","desc":"Normalize activations within a batch. Speeds training, allows higher learning rates. nn.BatchNorm2d."},
        {d:132,t:"Dropout","desc":"Randomly zero neurons during training. Prevents co-adaptation. nn.Dropout(p=0.5)."},
        {d:133,t:"Visualize CNN","desc":"Plot feature maps from conv layers. What patterns does the first layer detect? Second?"},
        {d:134,t:"Transfer Learning","desc":"Why use pretrained weights. ImageNet-trained features transfer to new tasks. Fine-tuning vs feature extraction."},
        {d:135,t:"ResNet Architecture","desc":"Skip connections solve vanishing gradients in deep networks. Why ResNet-50 still works great today."},
        {d:136,t:"Use Pretrained ResNet","desc":"torchvision.models.resnet50(pretrained=True). Replace final FC layer for new classes."},
        {d:137,t:"Fine-tune ResNet","desc":"Freeze backbone layers. Train only new head. Then unfreeze + train with low lr. Classic 2-stage approach."},
        {d:138,t:"Data Augmentation","desc":"transforms.RandomCrop, RandomFlip, ColorJitter, Normalize. Why augment: more variation, less overfitting."},
        {d:139,t:"Image Classifier Project","desc":"Collect 200+ images across 3 classes (anything!). Fine-tune ResNet. Achieve >85% validation accuracy."},
        {d:140,t:"Deploy with Gradio","desc":"gr.Interface for your image classifier. Upload image → get prediction. Share the Gradio link."},
      ]},
      { id:"3-3", range:"Week 21–22", days:"Days 141–154", title:"RNNs + Sequence Models", days_data:[
        {d:141,t:"Sequence Modeling Need","desc":"Why order matters: text, time series, audio. CNNs/MLPs don't model sequence order — RNNs do."},
        {d:142,t:"RNN Architecture","desc":"Hidden state passed between timesteps. Unrolling the RNN in time. Forward pass through sequence."},
        {d:143,t:"Vanishing Gradient","desc":"Why gradients vanish in long sequences. BPTT (backprop through time). Why RNNs struggle on long context."},
        {d:144,t:"LSTM Theory","desc":"Cell state as 'long-term memory'. Forget gate, input gate, output gate. Solves vanishing gradient."},
        {d:145,t:"LSTM in PyTorch","desc":"nn.LSTM — num_layers, hidden_size, batch_first. Forward pass output: (output, (h_n, c_n))."},
        {d:146,t:"GRU","desc":"Gated Recurrent Unit — simpler than LSTM. Update gate, reset gate. Often performs similar to LSTM."},
        {d:147,t:"RNN vs LSTM vs GRU","desc":"Side-by-side comparison on same task. Speed, memory, performance tradeoffs. When to choose each."},
        {d:148,t:"Time Series Data Prep","desc":"Windowing: use past N steps to predict next step. Create (X, y) pairs from a sequence."},
        {d:149,t:"LSTM Forecasting","desc":"Build LSTM model for time series. Train on 80%, evaluate on 20%. Plot predicted vs actual."},
        {d:150,t:"Day 150 Milestone!","desc":"Evaluate your forecast model. RMSE, MAE. Visualize error distribution. Push project to GitHub."},
        {d:151,t:"Text Generation","desc":"Character-level LSTM: train on text, generate new text. One-hot encoding. Temperature in sampling."},
        {d:152,t:"Seq2Seq Concept","desc":"Encoder RNN reads input, decoder RNN generates output. Used in translation, summarization."},
        {d:153,t:"Forecasting Project","desc":"Weather or stock price prediction with LSTM. Full notebook: data → model → deploy predictions."},
        {d:154,t:"LinkedIn Post","desc":"Write about your forecasting project. Include a chart comparing actual vs predicted. Tag it #MachineLearning."},
      ]},
      { id:"3-4", range:"Week 23–24", days:"Days 155–168", title:"Transformer Architecture", days_data:[
        {d:155,t:"RNN Limitations","desc":"Sequential computation = slow. Struggles with long-range dependencies. Transformers fix both."},
        {d:156,t:"Attention Intuition","desc":"'Paying attention' to relevant words. Given a word, which other words should influence its meaning?"},
        {d:157,t:"Self-Attention Math","desc":"Query, Key, Value matrices. Scaled dot-product attention. Softmax over similarity scores."},
        {d:158,t:"Multi-Head Attention","desc":"Run attention multiple times in parallel (each 'head'). Concatenate results. Different heads = different aspects."},
        {d:159,t:"Positional Encoding","desc":"Transformers process all tokens in parallel — no order info. Positional encoding injects position."},
        {d:160,t:"Encoder Block","desc":"Self-attention + Add & Norm + Feed-Forward + Add & Norm. Stack N of these = full encoder."},
        {d:161,t:"Read the Paper","desc":"Read 'Attention Is All You Need' — abstract, intro, architecture section. Take notes on each component."},
        {d:162,t:"Decoder Block","desc":"Masked self-attention (can't peek at future tokens) + cross-attention with encoder + FFN."},
        {d:163,t:"Full Transformer","desc":"Encoder + Decoder together. BERT = encoder only. GPT = decoder only. T5 = both. Map each."},
        {d:164,t:"Karpathy GPT Video","desc":"Watch 'Let's build GPT from scratch' by Andrej Karpathy (3hr). Pause and code along."},
        {d:165,t:"Implement nanoGPT","desc":"Follow along: implement tokenizer, embedding, self-attention, transformer block. ~200 lines of PyTorch."},
        {d:166,t:"Train Tiny GPT","desc":"Train your nanoGPT on a small text dataset (Shakespeare, Tamil text). Watch loss drop."},
        {d:167,t:"BERT vs GPT","desc":"BERT: bidirectional, encoder-only, great for classification. GPT: autoregressive, decoder-only, great for generation."},
        {d:168,t:"Phase 3 Review","desc":"Push all projects. Summarize what you learned. Update GitHub with clean READMEs."},
      ]},
    ]
  },
  {
    id: 4, label: "M7–8", title: "NLP + HuggingFace", color: "#FB923C",
    weeks: [
      { id:"4-1", range:"Week 25–26", days:"Days 169–182", title:"NLP Fundamentals", days_data:[
        {d:169,t:"NLP Overview","desc":"Core tasks: classification, NER, translation, summarization, QA. Why NLP is hard (ambiguity, context)."},
        {d:170,t:"Tokenization","desc":"Word tokenization. Subword (BPE — Byte Pair Encoding). Character-level. Why BERT uses WordPiece."},
        {d:171,t:"Text Preprocessing","desc":"Lowercasing, punctuation removal, stopwords, stemming (Porter), lemmatization (spaCy). When to apply each."},
        {d:172,t:"TF-IDF","desc":"Term Frequency × Inverse Document Frequency. sklearn TfidfVectorizer. Use for text classification."},
        {d:173,t:"Word2Vec","desc":"Skip-gram: predict context from word. CBOW: predict word from context. Train embeddings from scratch."},
        {d:174,t:"GloVe Embeddings","desc":"Global Vectors for word representation. Load pretrained GloVe vectors. Find similar words."},
        {d:175,t:"TF-IDF Classifier","desc":"Build a text classifier using TF-IDF + Logistic Regression on a news or review dataset."},
        {d:176,t:"Text Classification Pipeline","desc":"Full pipeline: load text → preprocess → vectorize → train classifier → evaluate. Clean code."},
        {d:177,t:"Sentiment Analysis","desc":"Classify positive/negative/neutral. IMDB dataset. Compare TF-IDF vs GloVe embeddings approach."},
        {d:178,t:"Named Entity Recognition","desc":"What NER is. Entities: PERSON, ORG, GPE, DATE. spaCy NER demo. Where it's used in products."},
        {d:179,t:"Text Similarity","desc":"Cosine similarity between TF-IDF vectors. Sentence embeddings. Build a simple document search."},
        {d:180,t:"Day 180 Milestone!","desc":"Build a sentiment classifier. Evaluate F1 per class. Write a LinkedIn post celebrating 6 months."},
        {d:181,t:"Evaluate + Compare","desc":"TF-IDF + LR vs GloVe + LSTM. Which performs better? Why? Document findings."},
        {d:182,t:"GitHub Push","desc":"Push all NLP experiments. README explains each approach and result."},
      ]},
      { id:"4-2", range:"Week 27–28", days:"Days 183–196", title:"HuggingFace + BERT", days_data:[
        {d:183,t:"HuggingFace Ecosystem","desc":"transformers, datasets, tokenizers, hub. The platform that democratized NLP. How to navigate it."},
        {d:184,t:"AutoTokenizer","desc":"AutoTokenizer.from_pretrained('bert-base-uncased'). Encode text. Input IDs, attention mask, token type IDs."},
        {d:185,t:"AutoModel","desc":"AutoModel, AutoModelForSequenceClassification. Load BERT. Understand output: logits, hidden states."},
        {d:186,t:"Pipeline API","desc":"pipeline('sentiment-analysis'), ('ner'), ('question-answering'), ('zero-shot-classification'). Run each."},
        {d:187,t:"Datasets Library","desc":"load_dataset(). Explore splits, columns. map() for preprocessing. Filter, shuffle, select."},
        {d:188,t:"Fine-tune BERT","desc":"Tokenize dataset → load BertForSequenceClassification → training loop (manual). Train on your text data."},
        {d:189,t:"Debug Training","desc":"Diagnose high loss, NaN gradients, overfitting. Use tensorboard or print metrics per epoch."},
        {d:190,t:"Trainer API","desc":"TrainingArguments + Trainer. Much less code than manual loop. Handles batching, eval, logging."},
        {d:191,t:"compute_metrics","desc":"Pass a compute_metrics function to Trainer. Return F1, accuracy, precision from sklearn."},
        {d:192,t:"Fine-tune RoBERTa","desc":"RoBERTa: robustly trained BERT. Load and fine-tune same way. Compare results with BERT."},
        {d:193,t:"Push to HF Hub","desc":"model.push_to_hub('your-username/model-name'). Your model is now public and downloadable."},
        {d:194,t:"Intent Classifier","desc":"Build an intent classifier for a chatbot: 'book flight', 'check weather', 'play music' etc."},
        {d:195,t:"Improve Accuracy","desc":"Data augmentation for NLP: paraphrasing, back-translation. Add more training examples. Tune lr."},
        {d:196,t:"Document + Share","desc":"Model card on HuggingFace Hub. Push README explaining data, metrics, use cases."},
      ]},
      { id:"4-3", range:"Week 29–30", days:"Days 197–210", title:"LLM Fine-tuning", days_data:[
        {d:197,t:"LLM Landscape","desc":"GPT-4, Claude, Llama 3, Mistral 7B, Phi-3. Open vs closed. Params: 7B, 13B, 70B. What 'billion params' means."},
        {d:198,t:"Instruction Tuning","desc":"Raw LLM → instruction-following LLM. What an instruction dataset looks like. Alpaca, FLAN formats."},
        {d:199,t:"LoRA Theory","desc":"Low-Rank Adaptation: inject small trainable matrices. Freeze 99% of weights. Efficient fine-tuning."},
        {d:200,t:"Day 200 Milestone!","desc":"QLoRA: quantize model to 4-bit THEN apply LoRA. Means you can fine-tune 7B on a single GPU/Colab."},
        {d:201,t:"Setup PEFT","desc":"pip install transformers peft trl bitsandbytes. Set up Google Colab with T4 GPU. Test imports."},
        {d:202,t:"Prepare Dataset","desc":"Format your data as instruction–response pairs. Use datasets.Dataset.from_dict(). Push to HF Hub."},
        {d:203,t:"Fine-tune Mistral 7B","desc":"Load Mistral with 4-bit quantization. Apply QLoRA config. Set up SFTTrainer (TRL library). Start training."},
        {d:204,t:"Monitor Training","desc":"Watch training loss drop. Log to Weights & Biases. Checkpoint every N steps."},
        {d:205,t:"Evaluate Fine-tuned Model","desc":"Generate responses before vs after fine-tuning. Manual evaluation. Does it follow instructions?"},
        {d:206,t:"Merge + Save","desc":"Merge LoRA weights into base model. Save with model.save_pretrained(). Test merged model."},
        {d:207,t:"Push Fine-tuned Model","desc":"Push to HuggingFace Hub. Write model card: what task, what data, what performance."},
        {d:208,t:"Fine-tune Llama 3","desc":"Repeat fine-tuning process with Llama 3 8B on a different task. Note differences vs Mistral."},
        {d:209,t:"Compare Models","desc":"Llama vs Mistral: inference speed, response quality, size on disk. Which fits your product need?"},
        {d:210,t:"Domain Q&A Bot","desc":"Fine-tune a model on a domain-specific dataset (Tamil education / fleet management). Test quality."},
      ]},
      { id:"4-4", range:"Week 31–32", days:"Days 211–224", title:"RAG Systems", days_data:[
        {d:211,t:"Why RAG?","desc":"LLMs have knowledge cutoff + hallucinate. RAG: retrieve relevant facts → inject into prompt → generate."},
        {d:212,t:"Sentence Embeddings","desc":"sentence-transformers library. Embed text to dense vectors. Semantic similarity with cosine distance."},
        {d:213,t:"Vector Databases","desc":"What a vector DB does. ChromaDB setup (local). Create collection, add documents, query."},
        {d:214,t:"Index Documents","desc":"Chunk your documents (PDFs, text). Embed each chunk. Store embeddings + text in Chroma."},
        {d:215,t:"Retrieval","desc":"Embed the user query. Find top-K most similar chunks with cosine similarity. Return context."},
        {d:216,t:"Basic RAG Pipeline","desc":"Query → retrieve top-3 chunks → build prompt 'Given context: {chunks}\\nAnswer: {query}' → LLM → output."},
        {d:217,t:"Test RAG","desc":"Test with 10 questions. Grade: did the retrieved chunks contain the answer? Fix chunking if not."},
        {d:218,t:"Advanced RAG","desc":"Re-ranking: use a cross-encoder to re-rank retrieved chunks by relevance. Improves precision."},
        {d:219,t:"Chunking Strategies","desc":"Fixed size, recursive, semantic chunking. Overlap between chunks. Chunk size effect on retrieval."},
        {d:220,t:"Pinecone","desc":"Cloud-based vector DB. Create index on Pinecone. Upsert embeddings. Compare with Chroma."},
        {d:221,t:"RAG Chatbot","desc":"Full chatbot: upload a PDF → chunk → embed → store → query → retrieve → generate answer with LLM."},
        {d:222,t:"Evaluate RAG","desc":"RAGAS framework: faithfulness, answer relevance, context recall, context precision. Score your RAG."},
        {d:223,t:"Gradio UI","desc":"Add a Gradio chat interface to your RAG chatbot. Deploy on HuggingFace Spaces for free."},
        {d:224,t:"Phase 4 Review","desc":"Push everything to GitHub. 4 months of deep work. Update LinkedIn with your RAG chatbot demo link."},
      ]},
    ]
  },
  {
    id: 5, label: "M9–10", title: "MLOps + Backend", color: "#F472B6",
    weeks: [
      { id:"5-1", range:"Week 33–34", days:"Days 225–238", title:"FastAPI + Model Serving", days_data:[
        {d:225,t:"Why FastAPI","desc":"Async, fast, auto-docs at /docs. Type hints with Pydantic. Better than Flask for ML APIs."},
        {d:226,t:"First FastAPI App","desc":"@app.get(), @app.post(). Path params, query params. Run with uvicorn. Test in browser."},
        {d:227,t:"Pydantic Models","desc":"Define request/response schemas with BaseModel. Automatic validation, clear error messages."},
        {d:228,t:"Load Model in FastAPI","desc":"Load sklearn or PyTorch model at startup (lifespan). Single global model instance. Inference on request."},
        {d:229,t:"Text Classification API","desc":"POST /predict endpoint. Input: JSON with text. Output: label + confidence. Test with curl."},
        {d:230,t:"Async Endpoints","desc":"async def with await. Why async matters under load. Background tasks with BackgroundTasks."},
        {d:231,t:"Test with Postman","desc":"Install Postman. Test all your endpoints. Check edge cases: empty input, long text, wrong type."},
        {d:232,t:"Model Serialization","desc":"joblib.dump/load for sklearn. torch.save/load for PyTorch. When to use ONNX for speed."},
        {d:233,t:"ONNX Export","desc":"Convert PyTorch model to ONNX. Run inference with onnxruntime. Benchmark latency improvement."},
        {d:234,t:"API Authentication","desc":"API key via Header or Query. Middleware for key check. Simple but effective for prod use."},
        {d:235,t:"Rate Limiting","desc":"slowapi library for FastAPI. Limit requests per minute. Return 429 when exceeded."},
        {d:236,t:"Background Tasks","desc":"Long inference → run in background, return job ID immediately. Poll for result. Prevents timeout."},
        {d:237,t:"Full LLM API","desc":"Wrap your fine-tuned Mistral/Llama in a FastAPI app. POST /chat endpoint. Test end-to-end."},
        {d:238,t:"Benchmark Latency","desc":"Use Python time module or locust to benchmark. What's average response time? P95 latency?"},
      ]},
      { id:"5-2", range:"Week 35–36", days:"Days 239–252", title:"Docker", days_data:[
        {d:239,t:"What is Docker?","desc":"Containers = isolated processes with their own filesystem. VM vs container. Why it solves 'works on my machine'."},
        {d:240,t:"First Container","desc":"docker pull ubuntu. docker run -it ubuntu bash. ls, exit. docker ps -a. docker rm."},
        {d:241,t:"Write Dockerfile","desc":"FROM python:3.11. WORKDIR. COPY. RUN pip install. EXPOSE. CMD. Build with docker build -t myapp ."},
        {d:242,t:"Containerize FastAPI","desc":"Dockerfile for your ML FastAPI app. Build, run, test locally. docker run -p 8000:8000 myapp."},
        {d:243,t:"Docker Compose","desc":"docker-compose.yml: define services (api, db). docker compose up. Multiple containers together."},
        {d:244,t:"Volumes + Persistence","desc":"Mount local folder into container. Why: persist DB data, hot-reload code during dev."},
        {d:245,t:"Debug Docker Issues","desc":"Common errors: port conflict, file not found, permission denied. How to inspect a running container."},
        {d:246,t:"Docker Networking","desc":"Containers in same Compose network can talk via service name. Bridge vs host network."},
        {d:247,t:"Optimize Image Size","desc":"Multi-stage builds: compile in stage 1, copy binary to stage 2. Alpine base images. .dockerignore."},
        {d:248,t:"Push to Docker Hub","desc":"docker tag myapp username/myapp:v1. docker push. Your image is now publicly pullable."},
        {d:249,t:"Compose with Postgres","desc":"Add Postgres service to Compose. Connect FastAPI to Postgres via SQLAlchemy. Store predictions."},
        {d:250,t:"Day 250 Milestone!","desc":"Containerize your full LLM API. docker compose up brings up everything. Share compose file on GitHub."},
        {d:251,t:"End-to-End Test","desc":"Full flow: docker compose up → send request to FastAPI → model inference → return result. All containerized."},
        {d:252,t:"Document Setup","desc":"README: how to build, run, test the Docker setup. Anyone should be able to reproduce in 5 minutes."},
      ]},
      { id:"5-3", range:"Week 37–38", days:"Days 253–266", title:"Cloud Deployment", days_data:[
        {d:253,t:"AWS Overview","desc":"EC2 (compute), S3 (storage), IAM (permissions), VPC (networking). Free tier limits. Create account."},
        {d:254,t:"Launch EC2","desc":"Launch t2.micro Ubuntu instance. Download .pem key. SSH in: ssh -i key.pem ubuntu@ip."},
        {d:255,t:"Docker on EC2","desc":"Install Docker on EC2. Pull your Docker image. docker run -d -p 8000:8000 myapp."},
        {d:256,t:"AWS S3 Basics","desc":"Create bucket. Upload model file (pkl or bin). Download in your app using boto3. Never hardcode creds."},
        {d:257,t:"Nginx + SSL","desc":"Install nginx as reverse proxy. Forward port 80 → 8000. Certbot for free SSL certificate."},
        {d:258,t:"Environment Variables","desc":"Never hardcode secrets. Use .env + python-dotenv locally. AWS Parameter Store for prod."},
        {d:259,t:"Document Deployment","desc":"Write step-by-step deployment guide. How would someone else replicate your setup from scratch?"},
        {d:260,t:"GitHub Actions Basics","desc":".github/workflows/deploy.yml. Triggers: on push to main. Steps: checkout, build Docker image."},
        {d:261,t:"Auto-Deploy Pipeline","desc":"On push → build Docker image → push to Docker Hub → SSH to EC2 → pull + restart container."},
        {d:262,t:"GCP Cloud Run","desc":"Serverless container platform. gcloud run deploy. Scales to zero (saves cost). Compare with EC2."},
        {d:263,t:"Cost Comparison","desc":"EC2 t2.micro vs Cloud Run per request pricing. Which is better for your traffic pattern?"},
        {d:264,t:"Deploy LLM API Live","desc":"Your fine-tuned model API is live on the internet. Get the URL. Share it. This is a real milestone."},
        {d:265,t:"Load Test","desc":"Locust: define user behavior, ramp up users. What's max RPS before latency spikes? Find bottleneck."},
        {d:266,t:"LinkedIn Post","desc":"Share your live API link. Explain what it does. 'Fine-tuned Mistral 7B API deployed on AWS — here's how.'"},
      ]},
      { id:"5-4", range:"Week 39–40", days:"Days 267–280", title:"Monitoring + Scaling", days_data:[
        {d:267,t:"Why Monitor?","desc":"Models degrade silently in production. Data distribution shifts. Users send unexpected inputs. You need visibility."},
        {d:268,t:"Python Logging","desc":"logging module: DEBUG, INFO, WARNING, ERROR. Log every prediction request + latency + outcome."},
        {d:269,t:"MLflow Tracking","desc":"mlflow.log_param(), log_metric(), log_artifact(). Compare 10 experiments in MLflow UI."},
        {d:270,t:"Weights & Biases","desc":"wandb.init(), wandb.log(). Track training loss, val metrics over time. Share run URLs."},
        {d:271,t:"Model Drift","desc":"Data drift: input distribution changes. Concept drift: relationship between X and y changes. How to detect."},
        {d:272,t:"Evidently AI","desc":"Open source ML monitoring. Generate HTML reports: feature drift, data quality, classification performance."},
        {d:273,t:"Set Up Monitoring","desc":"Log requests to DB. Run Evidently on a sliding window of recent predictions. Alert on drift."},
        {d:274,t:"Horizontal Scaling","desc":"Multiple instances behind a load balancer. Stateless APIs scale horizontally. Session state is the enemy."},
        {d:275,t:"Redis Caching","desc":"Cache inference results for repeated queries. docker run redis. redis-py client in FastAPI."},
        {d:276,t:"Batch vs Real-time","desc":"Real-time: low latency, one at a time. Batch: high throughput, scheduled. Which fits your product?"},
        {d:277,t:"Cost Optimization","desc":"4-bit quantization halves memory. Spot instances = 70% cheaper. Cache frequent queries. Right-size GPU."},
        {d:278,t:"Phase 5 Capstone","desc":"Production-grade ML API: FastAPI + Docker + Cloud + Auth + Monitoring + CI/CD. Document it all."},
        {d:279,t:"Architecture Diagram","desc":"Draw your full system: user → nginx → FastAPI → model → S3 → monitoring. Use Excalidraw or draw.io."},
        {d:280,t:"Phase 5 Review","desc":"You can now build AND deploy ML systems. Update portfolio. Phase 6 starts — building products for real."},
      ]},
    ]
  },
  {
    id: 6, label: "M11–12", title: "Build + Ship", color: "#FACC15",
    weeks: [
      { id:"6-1", range:"Week 41–44", days:"Days 281–308", title:"Product 1: AI Chatbot", days_data:[
        {d:281,t:"Plan Your Chatbot","desc":"Choose domain: Tamil education, fleet management, legal Q&A, medical FAQ. Define 5 user stories."},
        {d:282,t:"Dataset Collection","desc":"Collect 500+ Q&A pairs in your domain. Scrape, generate, or manually write. Clean and format."},
        {d:283,t:"Fine-tune for Domain","desc":"Fine-tune Mistral 7B with QLoRA on your domain dataset. Goal: in-domain responses that are accurate."},
        {d:284,t:"Build RAG Knowledge Base","desc":"Create a vector store with domain documents. Test retrieval accuracy before connecting to LLM."},
        {d:285,t:"FastAPI Chat Endpoint","desc":"POST /chat. Input: {message, history}. Output: {response}. Manage conversation history server-side."},
        {d:286,t:"React Chat UI","desc":"Build chat interface in React. Message list, input box, send button. Tailwind CSS for quick styling."},
        {d:287,t:"Connect Frontend + Backend","desc":"Fetch API call from React to FastAPI. CORS setup. Loading state while waiting for response."},
        {d:288,t:"End-to-End Test","desc":"Full flow: type message → FastAPI → RAG retrieval → LLM → response → display in UI. Fix bugs."},
        {d:289,t:"Streaming Responses","desc":"Server-Sent Events (SSE) for token-by-token streaming. Feels much better than waiting for full response."},
        {d:290,t:"Conversation History","desc":"Store conversation in DB (Supabase). Load history on page refresh. User sessions."},
        {d:291,t:"Deploy to Cloud","desc":"Docker Compose: React + FastAPI + Postgres. Deploy to EC2 or Cloud Run. Get a live URL."},
        {d:292,t:"User Testing","desc":"Share with 5 people. Give them 10 questions to ask. Observe where it fails. Note top 5 issues."},
        {d:293,t:"Fix Top Issues","desc":"Address the 3 most critical failures from user testing. Improve retrieval? Improve fine-tuning data?"},
        {d:294,t:"Case Study","desc":"Write: problem → approach → architecture → results → lessons learned. 500 words + diagrams."},
        {d:295,t:"Demo Video","desc":"Record a 3-minute demo video. Show the problem, show the solution working. Loom is free."},
        {d:296,t:"Launch!","desc":"Post on LinkedIn (with video). Deploy on HuggingFace Spaces. Submit to Product Hunt if ready."},
        {d:297,t:"Iterate Week 1","desc":"Based on real user feedback, prioritize improvements. Better UI, faster inference, more accurate answers."},
        {d:298,t:"Iterate Week 2","desc":"Add a feature: file upload, multi-language, voice input, or analytics dashboard."},
        {d:299,t:"Performance Tuning","desc":"Profile slow endpoints. Add caching. Optimize model loading. Reduce response latency."},
        {d:300,t:"Day 300 Milestone!","desc":"You have 1 live AI product. Update portfolio. Post progress update on LinkedIn."},
        {d:301,t:"Collect Metrics","desc":"Track: daily active users, messages/day, average session length, most common topics."},
        {d:302,t:"Refine Based on Data","desc":"What questions are users actually asking? Does your RAG knowledge base cover them well?"},
        {d:303,t:"Accessibility + UX","desc":"Mobile-responsive UI. Loading states. Error messages. Empty states. These details matter for real users."},
        {d:304,t:"Security Review","desc":"Prompt injection protection. Input sanitization. Rate limiting. No sensitive data in logs."},
        {d:305,t:"Documentation","desc":"Full README: setup, architecture, API docs, deployment guide. Future you will thank present you."},
        {d:306,t:"Open Source","desc":"Make the repo public. Write a good README. Share on GitHub. Someone might star or contribute."},
        {d:307,t:"Product 1 Wrap-Up","desc":"Final polish. Stable, deployed, documented. Take a day off — you shipped a real AI product."},
        {d:308,t:"Plan Product 2","desc":"Recommendation system. Define: what content to recommend? What dataset to use? What problem does it solve?"},
      ]},
      { id:"6-2", range:"Week 45–48", days:"Days 309–336", title:"Product 2: Recommendation System", days_data:[
        {d:309,t:"Plan Recommender","desc":"E-commerce products, movies, Tamil YouTube content, courses. Define the recommendation task clearly."},
        {d:310,t:"Dataset Prep","desc":"MovieLens 1M or Amazon Reviews. Load, clean, split into train/test. Understand interaction matrix."},
        {d:311,t:"Content-Based Filtering","desc":"TF-IDF on item descriptions. Cosine similarity. 'Users who liked X will like Y (similar content).'"},
        {d:312,t:"Collaborative Filtering","desc":"Matrix factorization (SVD). Find latent factors. Predict missing ratings. surprise library."},
        {d:313,t:"Hybrid Approach","desc":"Combine content + collaborative scores with a weighted blend. Often outperforms either alone."},
        {d:314,t:"Evaluation Metrics","desc":"Precision@K, Recall@K, NDCG@K. Mean Average Precision. Test on held-out interactions."},
        {d:315,t:"Choose Best Approach","desc":"Compare all three approaches on your test set. Pick the winner. Document your reasoning."},
        {d:316,t:"Recommendation API","desc":"FastAPI endpoint: POST /recommend. Input: user_id. Output: top-10 recommended items with scores."},
        {d:317,t:"React Feed UI","desc":"Card-based recommendation feed. Infinite scroll. Click to view item. Thumbs up/down for feedback."},
        {d:318,t:"User Feedback Loop","desc":"Store ratings/clicks. Re-compute recommendations with new interactions. Implicit feedback handling."},
        {d:319,t:"A/B Testing Concept","desc":"Expose 50% users to algorithm A, 50% to B. Compare click-through rate. Log which variant served."},
        {d:320,t:"Deploy","desc":"Docker + Cloud Run. Use Supabase for user interactions DB. Monitor latency."},
        {d:321,t:"Test + Iterate","desc":"Check recommendation quality manually. Are suggestions actually good? Fix cold start problem."},
        {d:322,t:"Case Study","desc":"Write the case study: problem, dataset, approaches tried, metrics, final architecture."},
        {d:323,t:"Polish + Demo","desc":"Record demo video. Share on LinkedIn. 'Built a recommendation engine from scratch — here's how.'"},
        {d:324,t:"Deep Dive: Neural CF","desc":"Neural Collaborative Filtering with PyTorch. Embedding users and items. Better than matrix factorization."},
        {d:325,t:"Implement Neural CF","desc":"Build NCF model. Train on MovieLens. Compare with SVD baseline. Log results to W&B."},
        {d:326,t:"Two-Tower Model","desc":"Google's approach: separate user encoder + item encoder. Fast retrieval at inference with ANN search."},
        {d:327,t:"Implement Two-Tower","desc":"Build two-tower in PyTorch. Train with contrastive loss. Use FAISS for approximate nearest neighbors."},
        {d:328,t:"FAISS Integration","desc":"faiss-cpu library. Build index of item embeddings. Query with user embedding. Millisecond retrieval."},
        {d:329,t:"Update API with Two-Tower","desc":"Replace SVD with two-tower + FAISS in your API. Benchmark latency — it should be faster."},
        {d:330,t:"Product 2 Polish","desc":"Full stack working, deployed, documented. Add to portfolio page."},
        {d:331,t:"Write LinkedIn Post","desc":"Technical deep-dive post: how your recommendation system works. Include architecture diagram."},
        {d:332,t:"Community Feedback","desc":"Share in ML Discord, Reddit r/MachineLearning, Twitter/X. Collect constructive criticism."},
        {d:333,t:"Apply Feedback","desc":"Pick 2 improvements from community. Implement. Repost with 'updated based on feedback'."},
        {d:334,t:"Code Cleanup","desc":"Refactor messy code. Type hints everywhere. Unit tests for critical functions. Linting with ruff."},
        {d:335,t:"Product 2 Wrap-Up","desc":"You now have 2 live AI products. 30 days left. Plan Product 3: prediction model."},
        {d:336,t:"Plan Product 3","desc":"Churn prediction, demand forecasting, or price prediction. Pick based on your target employer/client."},
      ]},
      { id:"6-3", range:"Week 49–52", days:"Days 337–365", title:"Product 3 + Portfolio + Launch", days_data:[
        {d:337,t:"Define Prediction Task","desc":"Customer churn: will this user cancel? Demand forecast: how many units next week? Define features."},
        {d:338,t:"Collect + Prepare Data","desc":"Find or generate realistic dataset. Clean, feature engineer, create train/test split with time-based split."},
        {d:339,t:"Build Prediction Model","desc":"XGBoost + SHAP for interpretability. SHAP shows why model made each prediction — crucial for businesses."},
        {d:340,t:"Evaluate + Tune","desc":"Cross-validate. Tune XGBoost hyperparameters. Target AUC > 0.85 for classification."},
        {d:341,t:"Prediction API","desc":"FastAPI endpoint: POST /predict. Return prediction + confidence + top 3 SHAP feature contributions."},
        {d:342,t:"Dashboard UI","desc":"React dashboard: input form + prediction result + SHAP bar chart. Simple but impressive demo."},
        {d:343,t:"Deploy + Test","desc":"Deploy on cloud. Full end-to-end test. Share internally with 3 people for feedback."},
        {d:344,t:"Polish Product 3","desc":"Final fixes. README + case study. 3 products in portfolio — that's rare and impressive."},
        {d:345,t:"Retraining Pipeline","desc":"Automate retraining: new data arrives → retrain model → compare with current → promote if better."},
        {d:346,t:"Product 3 Done","desc":"Add to portfolio. Three live, deployed AI products. Most ML engineering candidates have zero."},
        {d:347,t:"Portfolio Website","desc":"Build with React or Next.js. Sections: About, Skills, Projects (3 products), Blog, Contact."},
        {d:348,t:"Write Case Studies","desc":"Each project: problem → dataset → architecture diagram → key decisions → metrics → lessons. 400 words each."},
        {d:349,t:"Portfolio Demo Video","desc":"3-minute walkthrough of all 3 products. Talk about what you built, why, and what you learned."},
        {d:350,t:"LinkedIn Overhaul","desc":"Headline: 'ML Engineer | Fine-tuned LLMs | Built 3 deployed AI products'. Update About section with story."},
        {d:351,t:"GitHub Profile Polish","desc":"Profile README with stats, skills, featured repos. Each project repo has screenshots + live demo link."},
        {d:352,t:"Apply to 10 Roles","desc":"ML Engineer / AI Engineer / NLP Engineer at product companies. Tailor resume per role. Include live links."},
        {d:353,t:"Cold Outreach","desc":"Message 5 founders/CTOs of AI startups directly on LinkedIn. Short, specific, include your best project link."},
        {d:354,t:"ML Interview Prep","desc":"Study: bias-variance, regularization, transformer architecture, fine-tuning, RAG. Flashcards."},
        {d:355,t:"Coding Interview Prep","desc":"LeetCode: 5 Array, 5 String, 5 DP problems. ML interviews often include light coding rounds."},
        {d:356,t:"ML System Design","desc":"Study: 'Design YouTube recommendation system', 'Design a spam classifier at scale'. Draw architectures."},
        {d:357,t:"Mock Interview","desc":"Record yourself answering: 'Walk me through a project', 'How does LoRA work?', 'Design a RAG system.'"},
        {d:358,t:"Continue Applying","desc":"Apply to 10 more roles. Follow up on previous applications. Network in ML meetups (online or Coimbatore)."},
        {d:359,t:"Tamil YouTube Video","desc":"Record: 'My 365-day journey from graphic designer to ML engineer'. This video could go viral in Tamil ML community."},
        {d:360,t:"LinkedIn Anniversary Post","desc":"Big post: before → after. What you built, what you learned, what changed. This post will attract recruiters."},
        {d:361,t:"Negotiate Offers","desc":"Study: how to negotiate salary in India for tech roles. Counter-offer strategies. Know your market rate."},
        {d:362,t:"Contribute to Open Source","desc":"Submit a PR to a HuggingFace repo, LangChain, or FastAPI. Even docs improvement counts."},
        {d:363,t:"Plan Year 2","desc":"What's next? MLOps specialization? Research? Start your own product? Your Year 2 roadmap."},
        {d:364,t:"Rest + Reflect","desc":"You've earned it. Write 3 things you're proud of. 3 things you'd do differently. 3 goals for Year 2."},
        {d:365,t:"Day 365 — You Made It","desc":"From graphic designer to ML Engineer. 3 live AI products. Fine-tuned LLMs. Deployed on cloud. You did it."},
      ]},
    ]
  },
];

const schedule = [
  {time:"6:00–7:30am", task:"Core Learning", color:"#4A9EFF", detail:"Theory, courses, videos"},
  {time:"7:30–8:30am", task:"Coding", color:"#34D399", detail:"Build, experiment, practice"},
  {time:"8:30–9:00am", task:"LinkedIn/GitHub", color:"#FB923C", detail:"Post progress, commit code"},
  {time:"Evening (opt.)", task:"Reading", color:"#A78BFA", detail:"Papers, docs, review"},
];

function App() {
  const bgMusicRef = useRef(null);
  const slapSoundRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    bgMusicRef.current = new Audio(import.meta.env.BASE_URL + 'Play music.mp3');
    bgMusicRef.current.loop = true;
    slapSoundRef.current = new Audio(import.meta.env.BASE_URL + 'slap.mp3');

    const handleFirstInteraction = () => {
      bgMusicRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!bgMusicRef.current) return;
    if (isPlaying) {
      bgMusicRef.current.play().catch(() => setIsPlaying(false));
    } else {
      bgMusicRef.current.pause();
    }
  }, [isPlaying]);

  const [activePhase, setActivePhase] = useState(() => {
    const saved = localStorage.getItem('activePhase');
    return saved ? parseInt(saved) : 1;
  });
  const [expandedWeek, setExpandedWeek] = useState(() => {
    const saved = localStorage.getItem('expandedWeek');
    return saved || null;
  });
  const [expandedDay, setExpandedDay] = useState(null);
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('completedDays');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleDayComplete = (d) => {
    const newCompleted = completedDays.includes(d)
      ? completedDays.filter(x => x !== d)
      : [...completedDays, d];
    setCompletedDays(newCompleted);
    localStorage.setItem('completedDays', JSON.stringify(newCompleted));
  };

  const handleSetActivePhase = (id) => {
    setActivePhase(id);
    localStorage.setItem('activePhase', id);
    setExpandedWeek(null);
    setExpandedDay(null);
  };

  const handleToggleWeek = (id) => {
    const newWeek = expandedWeek === id ? null : id;
    setExpandedWeek(newWeek);
    localStorage.setItem('expandedWeek', newWeek || '');
  };

  const phase = roadmap.find(p => p.id === activePhase);
  const start = new Date("2026-04-03");
  const today = new Date();
  const currentDayNum = Math.max(1, Math.floor((today - start) / 86400000) + 1);
  const dayNum = completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1;

  const toggleDay = (d) => setExpandedDay(prev => prev === d ? null : d);

  const { rive, RiveComponent } = useRive({
    src: '/ml-365-days/18475-34717-shake-it-duo.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  const onHoverInput = useStateMachineInput(rive, 'State Machine 1', 'Hover');
  const onPressInput = useStateMachineInput(rive, 'State Machine 1', 'Press');

  const handleMouseEnter = () => {
    if (onHoverInput) onHoverInput.value = true;
  };
  const handleMouseLeave = () => {
    if (onHoverInput) onHoverInput.value = false;
  };
  const handlePress = () => {
    if (onPressInput) onPressInput.value = true;
    if (slapSoundRef.current) {
      slapSoundRef.current.currentTime = 0;
      slapSoundRef.current.play().catch(() => {});
    }
  };
  const handleRelease = () => {
    if (onPressInput) onPressInput.value = false;
  };

  return (
    <div style={{fontFamily:"system-ui, -apple-system, sans-serif", color:"#1a1a1a", maxWidth:640, margin:"0 auto", padding:"0.75rem 0.5", boxSizing:"border-box", width:"100%"}}>
      <button 
        onClick={() => setIsPlaying(prev => !prev)}
        style={{
          position: "fixed", 
          top: "12px", 
          right: "12px", 
          background: "rgba(255, 255, 255, 0.9)", 
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,0,0,0.08)", 
          borderRadius: "12px", 
          width: "36px", 
          height: "36px", 
          padding: 0,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer", 
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          transition: "all 0.2s ease"
        }}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{color: phase.color}}>
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{color: phase.color, marginLeft: 2}}>
            <path d="M5 3.867v16.266c0 .903 1.05 1.411 1.773.876l11-8.133a1.092 1.092 0 000-1.752l-11-8.133C6.05 2.456 5 2.964 5 3.867z" />
          </svg>
        )}
      </button>

      <div style={{marginBottom:"1rem"}}>
        <div style={{width:180, height:180, margin:"0 auto 16px"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseDown={handlePress} onMouseUp={handleRelease} onTouchStart={(e) => { e.preventDefault(); handlePress(); }} onTouchEnd={(e) => { e.preventDefault(); handleRelease(); }} onTouchCancel={handleRelease}>
          <RiveComponent />
        </div>
        <h1 style={{fontSize:22, fontWeight:600, margin:0, color:"#1a1a1a", textAlign:"center"}}>ML Engineer</h1>
        
        <div style={{display:"flex", justifyContent:"center", gap:16, marginTop:12, flexWrap:"wrap"}}>
          <div style={{display:"flex", alignItems:"center", gap:6}}>
            <span style={{fontSize:12, color:"#666", fontWeight:500}}>Day {dayNum}</span>
          </div>
          <div style={{flex:1, minWidth:100, maxWidth:200, height:4, background:"#eee", borderRadius:2, overflow:"hidden"}}>
            <div style={{width:`${Math.round((completedDays.length / 365) * 100)}%`, height:"100%", background:phase.color, borderRadius:2, transition:"width 0.3s ease"}}></div>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:6}}>
            <span style={{fontSize:12, color:phase.color, fontWeight:600}}>{completedDays.length}/365</span>
          </div>
        </div>
      </div>

          <div style={{display:"flex", gap:6, overflowX:"auto", paddingBottom:6, marginBottom:"1rem", scrollbarWidth:"none", WebkitOverflowScrolling:"touch"}}>
            {roadmap.map(p=>(
              <button key={p.id} onClick={()=>handleSetActivePhase(p.id)} style={{flexShrink:0, padding:"8px 14px", borderRadius:24, fontSize:12, cursor:"pointer", border:activePhase===p.id?`2px solid ${p.color}`:"1px solid #e5e5e5", background:activePhase===p.id ? p.color+"20" : "transparent", color:activePhase===p.id?p.color:"#666", fontWeight:activePhase===p.id?600:400, whiteSpace:"nowrap", transition:"all 0.2s ease"}}>
                {p.label} · {p.title}
              </button>
            ))}
          </div>

          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:"1rem", padding:"10px 14px", background:phase.color+"10", borderRadius:8, borderLeft:`3px solid ${phase.color}`}}>
            <span style={{fontSize:13, color:phase.color, fontWeight:500}}>{phase.weeks[0].days.split("–")[0].replace("Days ","Day ")} – {phase.weeks[phase.weeks.length-1].days.split("–")[1]}</span>
          </div>

          {phase.weeks.map(week=>{
            const isOpen = expandedWeek === week.id;
            return (
              <div key={week.id} className="week-card" style={{marginBottom:8, border:`1px solid ${isOpen ? phase.color+"66" : "#e5e5e5"}`, borderRadius:12, overflow:"hidden", transition:"all 0.25s ease", background:"#fff"}}>
                <button onClick={()=>handleToggleWeek(week.id)} style={{width:"100%", padding:"14px 16px", display:"flex", alignItems:"center", gap:12, background:isOpen?"#fafafa":"#fff", border:"none", cursor:"pointer", textAlign:"left", transition:"background 0.15s ease"}}>
                  <div style={{width:32, height:32, borderRadius:8, background:phase.color+"20", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <span style={{fontSize:14, fontWeight:600, color:phase.color}}>{week.days_data[0].d}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14, fontWeight:600, color:"#1a1a1a"}}>{week.title}</div>
                    <div style={{fontSize:12, color:"#888", marginTop:2}}>{week.range}</div>
                  </div>
                  <span style={{fontSize:18, color:phase.color, transform:isOpen?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.25s ease", flexShrink:0}}>›</span>
                </button>

                {isOpen && (
                  <div style={{borderTop:"1px solid #e5e5e5", animation:"slideDown 0.25s ease"}}>
                    {week.days_data.map((day, i)=>{
                      const key = `${week.id}-${day.d}`;
                      const isDayOpen = expandedDay === key;
                      const isPast = day.d < currentDayNum;
                      const isToday = day.d === currentDayNum;
                      const isCompleted = completedDays.includes(day.d);
                      return (
                        <div key={day.d} className="day-item" style={{borderBottom: i < week.days_data.length-1 ? "0.5px solid #eee" : "none"}}>
                          <div style={{width:"100%", padding:"10px 14px", display:"flex", alignItems:"center", gap:10, background:isToday?phase.color+"15":isDayOpen?"#f8f8f8":"transparent", cursor:"pointer", transition:"background 0.15s ease"}}>
                            <div onClick={()=>toggleDayComplete(day.d)} className="checkbox" style={{width:20, height:20, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:600, background: isCompleted ? phase.color : "transparent", border: isCompleted ? "none" : "2px solid #ccc", color: isCompleted ? "#fff" : "#999", cursor:"pointer", transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: isCompleted ? `0 2px 8px ${phase.color}40` : "none"}}>
                              {day.d}
                            </div>
                            <button onClick={()=>toggleDay(key)} style={{flex:1, minWidth:0, display:"flex", alignItems:"center", justifyContent:"space-between", background:"transparent", border:"none", cursor:"pointer", textAlign:"left", padding:0}}>
                              <div style={{fontSize:13, fontWeight:isToday?500:400, color:isCompleted ? phase.color : isToday?"#0066cc":"#1a1a1a", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", transition:"color 0.2s ease"}}>{day.t}{isToday?" ← Today":""}</div>
                              <span style={{fontSize:13, color:"#999", transform:isDayOpen?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.2s ease", flexShrink:0}}>›</span>
                            </button>
                          </div>
                          {isDayOpen && (
                            <div style={{padding:"0 14px 12px 34px", fontSize:13, color:"#666", lineHeight:1.7, animation:"slideDown 0.2s ease"}}>
                              {day.desc}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

    </div>
  );
}

export default App
