var documenterSearchIndex = {"docs":
[{"location":"guide/#Guide","page":"Guide","title":"Guide","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"This guide demonstrates the usage of PairPlots and shows several ways you can customize it to your liking.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Set up:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using CairoMakie\nusing PairPlots\nusing DataFrames","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"CairoMakie is great for making high quality static figures. Try GLMakie or WGLMakie for interactive plots!","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"We will use DataFrames here to wrap our tables and provide pleasant table listings. You can use any Tables.jl compatible source, including simple named tuples of vectors for each column.","category":"page"},{"location":"guide/#Single-Series","page":"Guide","title":"Single Series","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Let's create a basic table of data to vizualize.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"N = 100_000\nα = [2randn(N÷2) .+ 6; randn(N÷2)]\nβ = [3randn(N÷2); 2randn(N÷2)]\nγ = randn(N)\nδ = β .+ 0.6randn(N)\n\ndf = DataFrame(;α, β, γ, δ)\ndf[1:8,:] # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"We can plot this data directly using pairplot, and add customizations iteratively.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(df)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Override the axis labels:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df,\n    labels = Dict(\n        # basic string\n        :α => \"parameter 1\",\n        # Makie rich text\n        :β => rich(\"parameter 2\", font=:bold, color=:blue),\n        # LaTeX String\n        :γ => L\"\\frac{a}{b}\",\n    )\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Let's move onto more complex examples. The full syntax of the pairplot function is:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    PairPlots.Series(source) => (::PairPlots.VizType...),\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"That is, it accepts a list of pairs of PairPlots.Series => a tuple of \"vizualiation layers\". As we'll see later on, you can pass keyword arguments with a series, or a specific vizualization layer to customize their behaviour and appearance. If you don't need to adjust any parameters for a whole series, you can just pass in a data source and PairPlots will wrap it for you:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    source => (::PairPlots.VizType...),\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Let's see how this works by iteratively building up the default vizualiation. First, create a basic histogram plot:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.Hist(),) # note the comma\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"note: Note\nA tuple or list of vizualization types is required, even if you just want one. Make sure to include the comma in these examples.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Or, a histogram with hexagonal binning:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.HexBin(),)\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Scatter plots:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.Scatter(),)\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Filled contour plots:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.Contourf(),)\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Outlined contour plots:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.Contour(),)\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Now let's combine a few plot types.  Scatter and contours:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.Scatter(), PairPlots.Contour())\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Scatter and contours, but hiding points above 2sigma:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (PairPlots.Scatter(filtersigma=2), PairPlots.Contour())\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Placing a HexBin series underneath:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (\n        PairPlots.HexBin(colormap=Makie.cgrad([:transparent, :black])),\n        PairPlots.Scatter(filtersigma=2, color=:black),\n        PairPlots.Contour(color=:black)\n    )\n)","category":"page"},{"location":"guide/#Margin-plots","page":"Guide","title":"Margin plots","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"We can add additional vizualization layers to the diagonals of the plots using the same syntax.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (\n        PairPlots.HexBin(colormap=Makie.cgrad([:transparent, :black])),\n        PairPlots.Scatter(filtersigma=2, color=:black),\n        PairPlots.Contour(color=:black),\n\n        # New:\n        PairPlots.MarginDensity()\n    )\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (\n        PairPlots.HexBin(colormap=Makie.cgrad([:transparent, :black])),\n        PairPlots.Scatter(filtersigma=2, color=:black),\n        PairPlots.Contour(color=:black),\n\n        # New:\n        PairPlots.MarginHist(),\n        PairPlots.MarginConfidenceLimits(),\n    )\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    df => (\n        PairPlots.HexBin(colormap=Makie.cgrad([:transparent, :black])),\n        PairPlots.Scatter(filtersigma=2, color=:black),\n        PairPlots.Contour(color=:black),\n\n        # New:\n        PairPlots.MarginDensity(),\n        PairPlots.MarginConfidenceLimits(),\n    )\n)","category":"page"},{"location":"guide/#Adding-a-title","page":"Guide","title":"Adding a title","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"fig = pairplot(df)\nLabel(fig[0,:], \"This is the title!\")\nfig","category":"page"},{"location":"guide/#Layouts","page":"Guide","title":"Layouts","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"The pairplot function integrates easily within larger Makie Figures.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Customizing the figure:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"fig = Figure(resolution=(400,400))\npairplot(fig[1,1], df => (PairPlots.Contourf(),))\nfig","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"note: Note\nIf you only need to pass arguments to Figure, for convenience you can use pairplot(df, figure=(;...)).","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"You can plot into one part of a larger figure:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"fig = Figure(resolution=(800,800))\n\nscatterlines(fig[1,1], randn(40))\n\npairplot(fig[1,2], df)\n\nlines(fig[2,:], randn(200))\n\n\ncolsize!(fig.layout, 2, 450)\nrowsize!(fig.layout, 1, 450)\n\nfig\n","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Adjust the spacing between axes inside a pair plot:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"fig = Figure(resolution=(600,600))\n\n# Pair Plots must go into a Makie GridLayout. If you pass a GridPosition instead,\n# PairPlots will create one for you.\n# We can then adjust the spacing within that GridLayout.\n\ngs = GridLayout(fig[1,1])\npairplot(gs, df)\n\nrowgap!(gs, 0)\ncolgap!(gs, 0)\n\nfig","category":"page"},{"location":"guide/#Multiple-Series","page":"Guide","title":"Multiple Series","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"You can plot multiple series by simply passing more than one table to pairplot They don't have to have all the same column names.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"# The simplest table format is just a named tuple of vectors.\n# You can also pass a DataFrame, or any other Tables.jl compatible object.\ntable1 = (;\n    x = randn(10000),\n    y = randn(10000),\n)\n\ntable2 = (;\n    x = 1 .+ randn(10000),\n    y = 2 .+ randn(10000),\n    z = randn(10000),\n)\n\npairplot(table1, table2)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"You may want to add a legend:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"\nc1 = Makie.wong_colors(0.5)[1]\nc2 = Makie.wong_colors(0.5)[2]\n\npairplot(\n    PairPlots.Series(table1, label=\"table 1\", color=c1, strokecolor=c1),\n    PairPlots.Series(table2, label=\"table 2\", color=c2, strokecolor=c2),\n)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"You can customize each series independently if you wish.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"pairplot(\n    table2 => (PairPlots.HexBin(colormap=:magma), PairPlots.MarginDensity(color=:orange),  PairPlots.MarginConfidenceLimits(color=:black)),\n    table1 => (PairPlots.Contour(color=:cyan, strokewidth=5),),\n)","category":"page"},{"location":"api/#API-Documentation","page":"API","title":"API Documentation","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"pairplot\nPairPlots.AbstractSeries\nPairPlots.Series\nPairPlots.VizType\nPairPlots.VizTypeBody\nPairPlots.VizTypeDiag\nPairPlots.HexBin\nPairPlots.Hist\nPairPlots.Contour\nPairPlots.Contourf\nPairPlots.Scatter\nPairPlots.MarginConfidenceLimits\nPairPlots.MarginHist\nPairPlots.MarginDensity","category":"page"},{"location":"api/#PairPlots.pairplot","page":"API","title":"PairPlots.pairplot","text":"pairplot(inputs...; figure=(;), kwargs...)\n\nConvenience method to generate a new Makie figure with resolution (800,800) and then call pairplot as usual. Returns the figure.\n\nExample:\n\nfig = pairplot(table)\n\n\n\n\n\npairplot(gridpos::Makie.GridPosition, inputs...; kwargs...)\n\nCreate a pair plot at a given grid position of a Makie figure.\n\nExample\n\nfig = Figure()\npairplot(fig[2,3], table)\nfig\n\n\n\n\n\npairplot(gridpos::Makie.GridLayout, inputs...; kwargs...)\n\nConvenience function to create a reasonable pair plot given  one or more inputs that aren't full specified. Wraps input tables in PairPlots.Series() with a distinct color specified for each series.\n\nHere are the defaults applied for a single data table:\n\npairplot(fig[1,1], table) == # approximately the following:\npairplot(\n    PairPlots.Series(table, color=Makie.RGBA(0., 0., 0., 0.5)) => (\n        PairPlots.HexBin(colormap=Makie.cgrad([:transparent, :black]),bins=32),\n        PairPlots.Scatter(filtersigma=2), \n        PairPlots.Contour(),\n        PairPlots.MarginDensity(\n            color=:transparent,\n            strokecolor=:black,\n            strokewidth=1.5f0\n        ),\n        PairPlots.MarginConfidenceLimits()\n    )\n)\n\nHere are the defaults applied for 2 to 5 data tables:\n\npairplot(fig[1,1], table1, table2) == # approximately the following:\npairplot(\n    PairPlots.Series(table1, color=Makie.wong_colors(0.5)[1]) => (\n        PairPlots.Scatter(filtersigma=2), \n        PairPlots.Contourf(),\n        PairPlots.MarginDensity(\n            color=:transparent,\n            strokewidth=2.5f0\n        )\n    ),\n    PairPlots.Series(table2, color=Makie.wong_colors(0.5)[2]) => (\n        PairPlots.Scatter(filtersigma=2), \n        PairPlots.Contourf(),\n        PairPlots.MarginDensity(\n            color=:transparent,\n            strokewidth=2.5f0\n        )\n    ),\n)\n\nFor 6 or more tables, the defaults are approximately:\n\nPairPlots.Series(table1, color=Makie.wong_colors(0.5)[series_i]) => (\n    PairPlots.Contour(sigmas=[1]),\n    PairPlots.MarginDensity(\n        color=:transparent,\n        strokewidth=2.5f0\n    )\n)\n\n\n\n\n\npairplot(gridpos::Makie.GridLayout, inputs...; kwargs...)\n\nMain PairPlots function. Create a pair plot by plotting into a grid layout within a Makie figure.\n\nInputs should be one or more Pair of PairPlots.AbstractSeries => tuple of VizType.\n\nAdditional arguments:\n\nlabels: customize the axes labels with a Dict of column name (symbol) to string, Makie rich text, or LaTeX string.\ndiagaxis: customize the Makie.Axis of plots along the diagonal with a named tuple of keyword arguments.\nbodyaxis: customize the Makie.Axis of plots under the diagonal with a named tuple of keyword arguments.\nlegend:  additional keyword arguments to the Legend constructor, used if one or more series are labelled.\n\nYou can of course also create your own Legend and inset it into the Figure for complete control. \n\n\n\n\n\n","category":"function"},{"location":"api/#PairPlots.AbstractSeries","page":"API","title":"PairPlots.AbstractSeries","text":"AstractSeries\n\nRepresents some kind of series in PairPlots.\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.Series","page":"API","title":"PairPlots.Series","text":"Series(data; label=nothing, kwargs=...)\n\nA data series in PairPlots. Wraps a Tables.jl compatible table. You can optionally pass a label for this series to use in the plot legend. Keyword arguments are forwarded to every plot call for this series.\n\nExamples:\n\nser = Series(table; label=\"series 1\", color=:red)\n\n\n\n\n\nSeries(matrix::AbstractMatrix; label=nothing, kwargs...)\n\nConvenience constructor to build a Series from an abstract matrix. The columns are named accordingly to the axes of the Matrix (usually :1 though N).\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.VizType","page":"API","title":"PairPlots.VizType","text":"\" A type of PairPlots vizualization.\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.VizTypeBody","page":"API","title":"PairPlots.VizTypeBody","text":"\" A type of PairPlots vizualization that compares two variables.\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.VizTypeDiag","page":"API","title":"PairPlots.VizTypeDiag","text":"\"     VizTypeBody\n\nA type of PairPlots vizualization that only shows one variable. Used  for the plots along the diagonal.\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.HexBin","page":"API","title":"PairPlots.HexBin","text":"HexBin(;kwargs...)\n\nPlot two variables against eachother using a Makie Hex Bin series. kwargs are forwarded to the plot function and can be used to control the number of bins and the appearance.\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.Hist","page":"API","title":"PairPlots.Hist","text":"Hist(;kwargs...)\nHist(histprep_function; kwargs...)\n\nPlot two variables against eachother using a 2D histogram heatmap. kwargs are forwarded to the plot function and can be used to control the number of bins and the appearance.\n\nnote: Note\nYou can optionally pass a function to override how the histogram is calculated. It should have the signature: prepare_hist(xs, ys, nbins) and return a vector of horizontal bin centers, vertical bin centers, and a matrix of weights.tip: Tip\nYour prepare_hist function it does not have to obey nbins\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.Contour","page":"API","title":"PairPlots.Contour","text":"Contour(;sigmas=1:2, kwargs...)\n\nPlot two variables against eachother using a contour plot. The contours cover the area under a Gaussian given by sigmas, which must be <: AbstractVector. kwargs are forwarded to the plot function and can be used to control the appearance.\n\nKernelDensity.jl is used to produce smoother contours.\n\nnote: Note\nContours are calculated using Contour.jl and plotted as a Makie line series.\n\nSee also: Contourf\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.Contourf","page":"API","title":"PairPlots.Contourf","text":"Contourf(;sigmas=1:2, kwargs...)\n\nPlot two variables against eachother using a filled contour plot. The contours cover the area under a Gaussian given by sigmas, which must be <: AbstractVector. kwargs are forwarded to the plot function and can be used to control the appearance.\n\nKernelDensity.jl is used to produce smoother contours.\n\nSee also: Contour\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.Scatter","page":"API","title":"PairPlots.Scatter","text":"Scatter(;kwargs...)\n\nPlot two variables against eachother using a scatter plot.kwargs are forwarded to the plot function and can be used to control the appearance.\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.MarginConfidenceLimits","page":"API","title":"PairPlots.MarginConfidenceLimits","text":"MarginConfidenceLimits(;titlefmt=\"$\\mathrm{%.2f^{+%.2f}_{-%.2f}}$\", kwargs...)\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.MarginHist","page":"API","title":"PairPlots.MarginHist","text":"MarginHist(;kwargs...)\nMarginHist(histprep_function; kwargs...)\n\nPlot a marginal histogram of a single variable along the diagonal of the grid. kwargs are forwarded to the plot function and can be used to control the number of bins and the appearance.\n\ntip: Tip\nYou can optionally pass a function to override how the histogram is calculated. It should have the signature: prepare_hist(xs, nbins) and return a vector of bin centers and a vector of weights.note: Note\nYour prepare_hist function it does not have to obey nbins\n\n\n\n\n\n","category":"type"},{"location":"api/#PairPlots.MarginDensity","page":"API","title":"PairPlots.MarginDensity","text":"MarginDensity(;kwargs...)\n\nPlot the smoothed marginal density of a variable along the diagonal of the grid, using Makie's density  function. kwargs are forwarded to the plot function and can be used to control the appearance.\n\n\n\n\n\n","category":"type"},{"location":"getting-started/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"If you don't need any customization, the easiest way to get started is to call pairplot with one or more tables or matrices.","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"using CairoMakie\nusing PairPlots\n\n# The simplest table format is just a named tuple of vectors.\n# You can also pass a DataFrame, or any other Tables.jl compatible object.\ntable = (;\n    x = randn(10000),\n    y = randn(10000),\n)\n\npairplot(table)","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"The axis labels are taken from the column names by default, but you can customize them (see Guide).","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"If you're in a hurry, you can just pass a Matrix directly (or any subtype of AbstractMatrix).","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"using CairoMakie\nusing PairPlots\n\n# As always in Julia, columns are treated as variables, and rows as samples.\nmat = randn(10000,6)\npairplot(mat)","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"Multiple tables are also supported. They don't have to have the same column names.","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"using CairoMakie\nusing PairPlots\n\n# The simplest table format is just a named tuple of vectors.\n# You can also pass a DataFrame, or any other Tables.jl compatible object.\ntable1 = (;\n    x = randn(10000),\n    y = randn(10000),\n)\n\ntable2 = (;\n    x = 1 .+ randn(10000),\n    y = 2 .+ randn(10000),\n    z = randn(10000),\n)\n\npairplot(table1, table2)","category":"page"},{"location":"#PairPlots.jl","page":"Home","title":"PairPlots.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Beautiful and flexible vizualizations of high dimensional data","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Package Downloads)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package produces pair plots, otherwise known as corner plots or scatter plot matrices: grids of 1D and 2D histograms that allow you to visualize high dimensional data.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pair plots are an excellent way to vizualize the results of MCMC simulations, but are also a useful way to vizualize correlations in general data tables.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The default styles of this package roughly reproduce the output of the Python library corner.py for a single series, and chainconsumer.py for multiple series. If these are not to your tastes, the package aims to be highly configurable.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The current version of PairPlots.jl requires the Makie plotting library. If instead you prefer to use Plots.jl, you can install the legacy version 0.6 of PairPlots (see archived documentation here)","category":"page"},{"location":"","page":"Home","title":"Home","text":"For related functionality, see also StatsPlots.cornerplot.","category":"page"}]
}
