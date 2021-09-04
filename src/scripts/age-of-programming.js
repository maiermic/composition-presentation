Reveal.addEventListener("ready", function addFragmentToSvgElements() {
  class DrawIOSvg {
    svgElement;
    rectangleNameToIndexMap;
    pathNameToIndexMap;

    constructor({ svgElement, rectanglesOrder, pathsOrder }) {
      this.svgElement = svgElement;

      function createNameToIndexMap(order) {
        return order.reduce((nameToIndexMap, name, index) => {
          nameToIndexMap[name] = index + 1;
          return nameToIndexMap;
        }, {});
      }

      this.rectangleNameToIndexMap = createNameToIndexMap(rectanglesOrder);
      this.pathNameToIndexMap = createNameToIndexMap(pathsOrder);

      for (const rectangleName of Object.keys(this.rectangleNameToIndexMap)) {
        const rectangleElement = this.findRectangleByName(rectangleName);
        console.debug(
          "rectangle",
          rectangleName,
          this.rectangleNameToIndexMap[rectangleName],
          rectangleElement
        );
        rectangleElement.setAttribute("data-rectangle-name", rectangleName);
      }
      for (const pathName of Object.keys(this.pathNameToIndexMap)) {
        const pathElement = this.findPathByName(pathName);
        console.debug(
          "path",
          pathName,
          this.pathNameToIndexMap[pathName],
          pathElement
        );
        pathElement.setAttribute("data-path-name", pathName);
      }
    }

    findRectangleByIndex(index) {
      return this.svgElement.querySelector(`rect:nth-of-type(${index})`);
    }

    findRectangleByName(name) {
      return this.findRectangleByIndex(this.rectangleNameToIndexMap[name]);
    }

    /**
     * @param {Element} rectangleElement
     */
    findRectangleText(rectangleElement) {
      return rectangleElement.nextElementSibling;
    }

    findRectangleAndTextByName(name) {
      const rectangle = this.findRectangleByName(name);
      return [rectangle, this.findRectangleText(rectangle)];
    }

    findCommentElements(names) {
      const pathElements = this.findPathsByNames(names);
      const lastPathElement = pathElements[pathElements.length - 1];
      return [...pathElements, lastPathElement.nextElementSibling];
    }

    findPathByIndex(index) {
      return this.svgElement.querySelector(`path:nth-of-type(${index})`);
    }

    findPathByName(name) {
      return this.findPathByIndex(this.pathNameToIndexMap[name]);
    }

    findPathsByNames(names) {
      return names.map((name) => this.findPathByName(name));
    }
  }

  function directionalArrowPaths(name) {
    name = "arrow_" + name;
    return [name, `${name}End`];
  }

  function commentPaths(name) {
    name = "comment_" + name;
    return [name, `${name}Fold`];
  }

  /**
   * @param {DrawIOSvg} svg
   */
  function addFragmentToAllRectanglesOfSvg(svg) {
    for (let i = 1; ; i++) {
      const fragmentIndex = String(i);
      /** @type Element */
      const element = svg.findRectangleByIndex(i);
      if (element === null) {
        break;
      }
      element.classList.add(`rect-${i}`);
      // element.classList.add("fragment");
      // element.setAttribute("data-fragment-index", fragmentIndex);
    }
  }

  /**
   * @param {DrawIOSvg} svg
   */
  function addFragmentToAllPathsOfSvg(svg) {
    for (let i = 1; ; i++) {
      const fragmentIndex = String(i);
      /** @type Element */
      const element = svg.findPathByIndex(i);
      if (element === null) {
        break;
      }
      element.classList.add(`path-${i}`);
      // element.classList.add("fragment");
      // element.setAttribute("data-fragment-index", fragmentIndex);
    }
  }

  const aopSvgData = {
    rectangles: {
      operations: "operations",
      bits: "bits",
      registers: "registers",
      compiler: "compiler",
      statements: "statements",
      variables: "variables",
      expressions: "expressions",
      darkAge: "darkAge",
      imperativeAge: "imperativeAge",
      functions: "functions",
      parameters: "parameters",
      oopAge: "oopAge",
      classesObjects: "classesObjects",
      classesObjects_fields: "classesObjects_fields",
      classesObjects_methods: "classesObjects_methods",
      types: "types",
      interfaces: "interfaces",
    },
    arrows: {
      operationsToCompiler: directionalArrowPaths("operationsToCompiler"),
      bitsToRegisters: directionalArrowPaths("bitsToRegisters"),
      bitsToOperations: directionalArrowPaths("bitsToOperations"),
      registersToCompiler: directionalArrowPaths("registersToCompiler"),
      compilerToStatements: directionalArrowPaths("compilerToStatements"),
      compilerToVariables: directionalArrowPaths("compilerToVariables"),
      compilerToFunctions: directionalArrowPaths("compilerToFunctions"),
      compilerToExpressions: directionalArrowPaths("compilerToExpressions"),
      compilerToParameters: directionalArrowPaths("compilerToParameters"),
      compilerToTypes: directionalArrowPaths("compilerToTypes"),
      variablesToClassesObjects: directionalArrowPaths(
        "variablesToClassesObjects"
      ),
      functionsToClassesObjects: directionalArrowPaths(
        "functionsToClassesObjects"
      ),
      parametersToClassesObjects: directionalArrowPaths(
        "parametersToClassesObjects"
      ),
      typesToClassesObjects: directionalArrowPaths("typesToClassesObjects"),
      typesToInterfaces: directionalArrowPaths("typesToInterfaces"),
    },
    comments: {
      apps: commentPaths("apps"),
      compiler: commentPaths("compiler"),
      types: commentPaths("types"),
      paradigms: commentPaths("paradigms"),
    },
  };
  const aopSvg = new DrawIOSvg({
    svgElement: document.querySelector("svg"),
    rectanglesOrder: [
      aopSvgData.rectangles.operations,
      aopSvgData.rectangles.bits,
      aopSvgData.rectangles.registers,
      aopSvgData.rectangles.compiler,
      aopSvgData.rectangles.statements,
      aopSvgData.rectangles.variables,
      aopSvgData.rectangles.expressions,
      aopSvgData.rectangles.darkAge,
      aopSvgData.rectangles.imperativeAge,
      aopSvgData.rectangles.functions,
      aopSvgData.rectangles.parameters,
      aopSvgData.rectangles.oopAge,
      aopSvgData.rectangles.classesObjects,
      aopSvgData.rectangles.classesObjects_fields,
      aopSvgData.rectangles.classesObjects_methods,
      aopSvgData.rectangles.types,
      aopSvgData.rectangles.interfaces,
    ],
    pathsOrder: [
      aopSvgData.arrows.operationsToCompiler,
      aopSvgData.arrows.bitsToRegisters,
      aopSvgData.arrows.bitsToOperations,
      aopSvgData.arrows.registersToCompiler,
      aopSvgData.arrows.compilerToStatements,
      aopSvgData.arrows.compilerToVariables,
      aopSvgData.arrows.compilerToFunctions,
      aopSvgData.arrows.compilerToExpressions,
      aopSvgData.arrows.compilerToParameters,
      aopSvgData.arrows.compilerToTypes,
      aopSvgData.arrows.variablesToClassesObjects,
      aopSvgData.arrows.functionsToClassesObjects,
      aopSvgData.arrows.parametersToClassesObjects,
      aopSvgData.arrows.typesToClassesObjects,
      aopSvgData.arrows.typesToInterfaces,

      aopSvgData.comments.compiler,
      aopSvgData.comments.types,
      aopSvgData.comments.apps,
      aopSvgData.comments.paradigms,
    ].flat(),
  });
  addFragmentToAllRectanglesOfSvg(aopSvg);
  addFragmentToAllPathsOfSvg(aopSvg);
  const fragmentGroups = [
    aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.darkAge),
    aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.imperativeAge),
    aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.oopAge),
    aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.bits),
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.bitsToOperations),
      ...aopSvg.findPathsByNames(aopSvgData.arrows.bitsToRegisters),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.operations),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.registers),
    ],
    aopSvg.findCommentElements(aopSvgData.comments.apps),
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.operationsToCompiler),
      ...aopSvg.findPathsByNames(aopSvgData.arrows.registersToCompiler),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.compiler),
    ],
    aopSvg.findCommentElements(aopSvgData.comments.compiler),
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.compilerToStatements),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.statements),
      ...aopSvg.findPathsByNames(aopSvgData.arrows.compilerToExpressions),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.expressions),
      ...aopSvg.findPathsByNames(aopSvgData.arrows.compilerToFunctions),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.functions),
    ],
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.compilerToVariables),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.variables),
      ...aopSvg.findPathsByNames(aopSvgData.arrows.compilerToParameters),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.parameters),
    ],
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.compilerToTypes),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.types),
    ],
    aopSvg.findCommentElements(aopSvgData.comments.types),
    [
      ...aopSvg.findRectangleAndTextByName(
        aopSvgData.rectangles.classesObjects
      ),
      ...aopSvg.findRectangleAndTextByName(
        aopSvgData.rectangles.classesObjects_fields
      ),
      ...aopSvg.findRectangleAndTextByName(
        aopSvgData.rectangles.classesObjects_methods
      ),
    ],
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.variablesToClassesObjects),
      ...aopSvg.findPathsByNames(aopSvgData.arrows.parametersToClassesObjects),
    ],
    aopSvg.findPathsByNames(aopSvgData.arrows.functionsToClassesObjects),
    aopSvg.findPathsByNames(aopSvgData.arrows.typesToClassesObjects),
    [
      ...aopSvg.findPathsByNames(aopSvgData.arrows.typesToInterfaces),
      ...aopSvg.findRectangleAndTextByName(aopSvgData.rectangles.interfaces),
    ],
    aopSvg.findCommentElements(aopSvgData.comments.paradigms),
  ];
  for (const [i, fragmentGroup] of fragmentGroups.entries()) {
    const fragmentIndex = String(i + 1);
    for (/** @type Element */ const element of fragmentGroup) {
      element.classList.add("fragment");
      element.setAttribute("data-fragment-index", fragmentIndex);
    }
  }
});
