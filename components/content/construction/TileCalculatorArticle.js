import Link from "next/link";

const TileCalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* ================= INTRODUCTION ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Tile Calculator – Estimate Tiles Required for Floors and Walls
        </h1>

        <p>
          Tiles are one of the most widely used finishing materials in modern
          construction. Whether you are renovating a home, building a new house,
          or designing a commercial space, tiles are commonly installed on
          floors, walls, bathrooms, kitchens, and outdoor areas. They provide
          durability, easy maintenance, and a clean aesthetic appearance.
        </p>

        <p>
          However, before starting any tiling project, one important question
          must be answered:{" "}
          <strong>How many tiles are actually required?</strong>
          Estimating tile quantity incorrectly can create costly problems.
          Buying too few tiles can delay the project and force you to search for
          the same tile batch later. Buying too many tiles means spending money
          on materials that may never be used.
        </p>

        <p>
          This is where a <strong>Tile Calculator</strong> becomes extremely
          useful. The Swiftcalcfy Tile Calculator helps you quickly estimate the
          number of tiles required based on the size of the room and the
          dimensions of each tile. Instead of relying on rough guesses, the tool
          performs precise area calculations and provides instant results.
        </p>

        <p>
          By using this calculator, homeowners, builders, contractors, and
          interior designers can plan tile purchases more accurately. Proper
          estimation reduces construction waste, prevents shortages during
          installation, and helps keep renovation costs under control.
        </p>

        <p>
          In this guide, you will learn how tile calculations work, what factors
          influence tile quantity, and how to estimate materials correctly
          before starting your flooring or wall tiling project.
        </p>
      </section>

      {/* ================= WHY IMPORTANT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Why Tile Quantity Calculation Matters
        </h2>

        <p>
          Accurate tile estimation is one of the most important steps in
          planning a flooring or wall tiling project. Tiles are usually
          manufactured in batches, and each batch can have small variations in
          shade, texture, or finish. This means buying the correct quantity
          before installation begins is essential for maintaining a consistent
          appearance.
        </p>

        <p>
          If you underestimate the number of tiles required, the installation
          process may stop in the middle of the project. When you return to
          purchase more tiles, the store might not have tiles from the same
          batch or production series. Even small differences in color tone can
          become noticeable once the tiles are installed on a large surface.
        </p>

        <p>
          Overestimating tile quantity also creates problems. Tiles are not
          cheap construction materials, especially when using premium ceramic,
          porcelain, or designer tiles. Purchasing too many tiles increases your
          renovation budget and leaves unused boxes that may never be needed.
        </p>

        <p>
          A proper tile calculation helps strike the right balance between
          having enough materials for installation and avoiding unnecessary
          expenses. This is why contractors, builders, and interior designers
          always measure the total surface area and estimate tile requirements
          before starting work.
        </p>

        <p>
          Using a tile calculator simplifies this process by providing quick and
          reliable estimates based on the size of the room and the dimensions of
          each tile.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Prevents tile shortages during installation</li>
          <li>Reduces unnecessary material wastage</li>
          <li>Helps maintain a consistent tile color and batch</li>
          <li>Improves construction planning and scheduling</li>
          <li>Keeps renovation budgets under control</li>
        </ul>
      </section>

      {/* ================= CONCEPT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Understanding the Tile Area Concept
        </h2>

        <p>
          The concept behind tile estimation is based on a simple mathematical
          principle: area coverage. Every floor or wall surface has a total area
          that needs to be covered, and each tile covers a specific portion of
          that area depending on its dimensions.
        </p>

        <p>
          When planning a tiling project, the first step is to calculate the
          total surface area of the room or wall. This is typically done by
          multiplying the length and width of the surface. Once the total area
          is known, the next step is to determine how much area a single tile
          can cover.
        </p>

        <p>
          For example, if a tile measures 2 feet by 2 feet, it covers an area of
          4 square feet. If the total surface area of the room is 100 square
          feet, dividing 100 by 4 shows that approximately 25 tiles are needed
          to cover the entire space.
        </p>

        <p>
          However, tile installation in real construction projects is rarely
          this perfect. Rooms may have corners, edges, pillars, pipes, or
          irregular shapes that require tiles to be cut. During cutting and
          installation, some tiles may crack or break.
        </p>

        <p>
          Because of these real world challenges, professionals always include a
          small safety margin called the <strong>wastage factor</strong>. This
          extra percentage ensures that there are enough tiles available to
          complete the installation without interruption.
        </p>

        <p>
          In most standard flooring projects, contractors typically add around
          10 percent extra tiles. For more complex layouts such as diagonal
          patterns or decorative tile designs, the wastage percentage may
          increase to 15 or even 20 percent.
        </p>

        <p>
          Understanding this area based calculation helps homeowners and
          builders estimate tile quantities more accurately and avoid costly
          mistakes during construction or renovation projects.
        </p>
      </section>

      {/* ================= TERMS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Key Terms You Should Know</h2>

        <p>
          Before using a tile calculator, it is helpful to understand a few
          important terms used in tile estimation. These concepts explain how
          tile quantities are calculated and why certain extra tiles are
          included in the final result.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Surface Area</strong> – This refers to the total area of the
            floor or wall that needs to be covered with tiles. Surface area is
            usually calculated by multiplying the length and width of the space.
            For example, a room that measures 10 feet by 12 feet has a total
            surface area of 120 square feet.
          </li>

          <li>
            <strong>Tile Size</strong> – Tile size describes the physical
            dimensions of a single tile, typically measured by its length and
            width. Tiles come in many standard sizes such as 300×300 mm, 600×600
            mm, or 2×2 feet. The size of the tile determines how much area each
            piece can cover.
          </li>

          <li>
            <strong>Tile Area</strong> – Tile area is the amount of surface
            covered by one tile. It is calculated by multiplying the tile’s
            length and width. For instance, a tile measuring 2 feet by 2 feet
            covers 4 square feet of surface area.
          </li>

          <li>
            <strong>Wastage Percentage</strong> – During tile installation, some
            tiles must be cut to fit edges, corners, and irregular spaces. A few
            tiles may also break during handling or installation. Because of
            this, professionals add extra tiles, usually around 10–15 percent,
            to ensure the project can be completed without running short.
          </li>

          <li>
            <strong>Tile Layout</strong> – Tile layout refers to the pattern
            used when installing tiles. Common layouts include straight grid
            patterns, diagonal patterns, and decorative designs. More complex
            layouts usually require additional tile cutting, which increases the
            wastage percentage.
          </li>
        </ul>

        <p>
          Understanding these basic terms helps users interpret the calculator
          results correctly and make better decisions when purchasing tiles for
          flooring or wall installations.
        </p>
      </section>

      {/* ================= HOW WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Tile Calculator Works</h2>

        <p>
          The Tile Calculator uses a straightforward mathematical method to
          estimate how many tiles are required to cover a specific floor or wall
          area. Instead of performing manual calculations, the tool processes
          the measurements you provide and instantly produces an accurate
          estimate.
        </p>

        <p>
          The process follows a logical sequence that construction professionals
          commonly use when planning tile installations.
        </p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Enter the surface dimensions.</strong>
            First, you provide the length and width of the area that needs to be
            tiled. This could be a floor, wall, kitchen backsplash, or bathroom
            surface.
          </li>

          <li>
            <strong>Calculate the total surface area.</strong>
            The calculator multiplies the length and width to determine the
            total area that must be covered with tiles.
          </li>

          <li>
            <strong>Enter the tile dimensions.</strong>
            Next, you input the size of a single tile. Tile dimensions are
            usually given in centimeters, millimeters, or feet depending on the
            tile type.
          </li>

          <li>
            <strong>Determine the area covered by one tile.</strong>
            The calculator multiplies the tile length and width to determine how
            much area each tile can cover.
          </li>

          <li>
            <strong>Divide the total surface area by the tile area.</strong>
            This step determines the base number of tiles required to cover the
            entire surface without considering cutting or breakage.
          </li>

          <li>
            <strong>Add the wastage percentage.</strong>A small extra percentage
            is added to account for tile cutting, fitting edges, breakage, and
            installation adjustments.
          </li>
        </ol>

        <p>
          After completing these steps, the calculator provides the final
          estimated number of tiles needed for the project. This result helps
          homeowners and contractors purchase the correct quantity of tiles
          before installation begins.
        </p>
      </section>

      {/* ================= INPUTS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Inputs Required in the Calculator
        </h2>

        <p>
          To generate an accurate tile estimate, the calculator requires a few
          basic measurements related to the surface area and the tile size.
          These inputs help determine how many tiles are needed to cover the
          entire space.
        </p>

        <p>
          Entering precise measurements is important because even small mistakes
          in length or width can significantly change the final tile quantity.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Surface Length</strong> – This is the total length of the
            floor or wall that will be covered with tiles. Measure the distance
            from one end of the area to the other using a measuring tape.
          </li>

          <li>
            <strong>Surface Width</strong> – This represents the width of the
            area being tiled. When multiplied with the length, it determines the
            total surface area that needs to be covered.
          </li>

          <li>
            <strong>Tile Length</strong> – This is the length of a single tile.
            Tile sizes vary widely depending on the design and manufacturer.
          </li>

          <li>
            <strong>Tile Width</strong> – This refers to the width of one tile.
            Together with tile length, it determines the total area that each
            tile can cover.
          </li>

          <li>
            <strong>Wastage Percentage</strong> – This value accounts for tiles
            that may be lost during cutting, breakage, or adjustments during
            installation. Most flooring projects use a wastage factor of around
            10–15 percent.
          </li>
        </ul>

        <p>
          Providing accurate measurements for these inputs ensures that the tile
          calculator produces reliable results and helps prevent shortages
          during installation.
        </p>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Understanding the Calculator Results
        </h2>

        <p>
          Once all required measurements are entered, the calculator processes
          the data and generates several useful outputs. These results help you
          understand how many tiles are required and how much area they will
          cover.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Total Surface Area</strong> – This shows the complete floor
            or wall area that needs to be covered with tiles.
          </li>

          <li>
            <strong>Tile Coverage Area</strong> – This indicates how much
            surface area a single tile can cover based on its length and width.
          </li>

          <li>
            <strong>Tiles Required (Without Wastage)</strong> – This is the base
            number of tiles required if every tile fits perfectly without any
            cutting or damage.
          </li>

          <li>
            <strong>Total Tiles Including Wastage</strong> – This is the final
            recommended number of tiles after adding the extra percentage
            required for cutting, breakage, and installation adjustments.
          </li>
        </ul>

        <p>
          These results help homeowners, contractors, and builders determine how
          many tiles to purchase before starting installation. It also helps
          when estimating the number of tile boxes needed based on how many
          tiles are included in each box.
        </p>
      </section>

      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tile Calculation Formula</h2>

        <p>
          Tile estimation is based on simple area calculations that determine
          how much surface needs to be covered and how much area each tile can
          cover. These formulas are commonly used by contractors, architects,
          and construction planners when estimating materials for flooring and
          wall installations.
        </p>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm space-y-2">
          <p>Surface Area = Length × Width</p>
          <p>Tile Area = Tile Length × Tile Width</p>
          <p>Tiles Needed = Surface Area ÷ Tile Area</p>
          <p>Final Tiles = Tiles Needed + Wastage</p>
        </div>

        <p>
          The first formula determines the total surface area of the room or
          wall. The second formula calculates how much area one tile can cover.
          By dividing the total surface area by the tile area, the calculator
          determines how many tiles are required to cover the space.
        </p>

        <p>
          Finally, a small percentage of extra tiles is added to account for
          cutting, breakage, and installation adjustments. This additional
          quantity ensures that the tiling project can be completed smoothly
          without running out of tiles.
        </p>
      </section>

      {/* ================= EXAMPLES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculations</h2>

        <p>
          To better understand how tile estimation works, let's walk through a
          simple real world example.
        </p>

        <p>
          Suppose you want to install tiles in a room that measures 12 feet in
          length and 10 feet in width.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Room length = 12 feet</li>
          <li>Room width = 10 feet</li>
        </ul>

        <p>First, calculate the total surface area of the room.</p>

        <p>
          <strong>Surface Area = 12 × 10 = 120 square feet</strong>
        </p>

        <p>Now assume the tiles you selected measure 2 feet by 2 feet.</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Tile length = 2 feet</li>
          <li>Tile width = 2 feet</li>
        </ul>

        <p>The area covered by a single tile is:</p>

        <p>
          <strong>Tile Area = 2 × 2 = 4 square feet</strong>
        </p>

        <p>
          Next, divide the total surface area by the tile area to determine the
          number of tiles required.
        </p>

        <p>
          <strong>Tiles Needed = 120 ÷ 4 = 30 tiles</strong>
        </p>

        <p>
          However, tile installation requires extra tiles for cutting and
          possible breakage. If we add a standard wastage allowance of 10
          percent, the final tile requirement becomes approximately 33 tiles.
        </p>

        <p>
          In practice, it is always safer to round up and purchase a few
          additional tiles. In this case, buying around 34 to 35 tiles ensures
          that the installation can be completed without interruptions.
        </p>
      </section>
      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Factors That Affect Tile Estimation
        </h2>

        <p>
          The number of tiles required for a project can vary depending on
          several important factors. Understanding these variables helps
          homeowners and contractors estimate tile quantities more accurately
          and avoid shortages during installation.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Tile Size</strong> – Larger tiles cover more surface area,
            which means fewer tiles are needed to cover a room. Smaller tiles
            cover less area and therefore require a greater number of pieces.
          </li>

          <li>
            <strong>Room Dimensions</strong> – The length and width of the space
            directly determine the total surface area. Larger rooms obviously
            require more tiles than smaller spaces.
          </li>

          <li>
            <strong>Tile Layout Pattern</strong> – Straight grid patterns
            usually require fewer extra tiles, while diagonal or decorative
            layouts often require additional cutting and therefore increase
            wastage.
          </li>

          <li>
            <strong>Cutting Requirements</strong> – Areas near walls, corners,
            doorways, and pipes often require tiles to be trimmed to fit
            properly. These cuts can increase the number of tiles needed.
          </li>

          <li>
            <strong>Tile Breakage</strong> – Tiles can sometimes crack during
            transportation or installation. Including extra tiles ensures the
            project continues smoothly even if a few tiles break.
          </li>
        </ul>

        <p>
          Considering these factors before purchasing tiles helps ensure that
          the project has enough materials to be completed without
          interruptions.
        </p>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Benefits of Using a Tile Calculator
        </h2>

        <p>
          A tile calculator simplifies the planning process for flooring and
          wall installations. Instead of performing manual calculations, users
          can enter a few measurements and instantly receive accurate estimates.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Faster Planning</strong> – The calculator performs complex
            calculations instantly, saving time compared to manual estimation.
          </li>

          <li>
            <strong>More Accurate Material Estimation</strong> – By using exact
            measurements, the tool provides reliable tile quantity estimates.
          </li>

          <li>
            <strong>Better Budget Management</strong> – Accurate tile estimates
            help homeowners plan renovation costs more effectively and avoid
            unnecessary purchases.
          </li>

          <li>
            <strong>Reduced Construction Waste</strong> – Proper planning
            minimizes excess materials and helps prevent unused tiles from being
            wasted.
          </li>

          <li>
            <strong>Improved Project Efficiency</strong> – Knowing the correct
            tile quantity before installation helps ensure that construction
            work proceeds smoothly without delays caused by material shortages.
          </li>
        </ul>

        <p>
          Overall, using a tile calculator provides a convenient and reliable
          way to estimate materials before starting a tiling project.
        </p>
      </section>

      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Mistakes People Make</h2>

        <p>
          When planning a tiling project, many people make small mistakes that
          can lead to material shortages, increased costs, or installation
          delays. Understanding these common errors helps ensure smoother
          project planning.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Forgetting the wastage percentage</strong> – Many people
            calculate only the exact tile requirement and forget to add extra
            tiles for cutting, breakage, and installation adjustments. Without
            this safety margin, projects may run out of tiles before completion.
          </li>

          <li>
            <strong>Incorrect room measurements</strong> – Even small
            measurement errors can significantly affect tile estimates. Always
            measure the length and width of the room carefully before entering
            values into the calculator.
          </li>

          <li>
            <strong>Ignoring the tile layout pattern</strong> – Different
            installation patterns require different amounts of tile cutting.
            Diagonal or decorative layouts usually require more tiles than
            simple straight patterns.
          </li>

          <li>
            <strong>Buying tiles from different batches</strong> – Tiles from
            different manufacturing batches may have slight variations in color
            or texture. Mixing batches can create noticeable differences once
            the tiles are installed.
          </li>
        </ul>

        <p>
          Avoiding these common mistakes helps ensure accurate tile estimation
          and smoother installation.
        </p>
      </section>

      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tips to Improve Tile Planning</h2>

        <p>
          Proper planning can make tile installation easier, more efficient, and
          cost effective. The following practical tips can help improve tile
          estimation and reduce potential problems during installation.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Measure twice before calculating</strong> – Always double
            check room dimensions to ensure accurate measurements before
            estimating tile quantities.
          </li>

          <li>
            <strong>Add at least 10 percent extra tiles</strong> – This
            additional margin accounts for tile cutting, installation
            adjustments, and possible breakage during handling.
          </li>

          <li>
            <strong>Buy tiles from the same production batch</strong> –
            Purchasing all tiles at once helps maintain consistent color,
            finish, and texture across the entire installation area.
          </li>

          <li>
            <strong>Keep spare tiles for future repairs</strong> – Storing a few
            extra tiles allows you to replace damaged tiles later without
            worrying about finding matching designs.
          </li>
        </ul>

        <p>
          Following these simple planning tips can help ensure a smoother tiling
          project and reduce the risk of costly mistakes.
        </p>
      </section>

      {/* ================= RELATED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Construction Calculators</h2>

        <p>
          Construction and renovation projects usually require multiple material
          calculations. In addition to estimating tile quantities, you may also
          need to calculate other materials such as paint, cement, or sand.
          These related calculators can help you plan your project more
          accurately and control overall construction costs.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/construction/paint-calculator">Paint Calculator</Link>{" "}
            – Estimate how much paint is required for walls, ceilings, and other
            surfaces based on room size.
          </li>

          <li>
            <Link href="/construction/cement-quantity-calculator">
              Cement Quantity Calculator
            </Link>{" "}
            – Calculate the amount of cement required for concrete work such as
            slabs, columns, and flooring.
          </li>

          <li>
            <Link href="/construction/sand-quantity-calculator">
              Sand Quantity Calculator
            </Link>{" "}
            – Determine the amount of sand required for plastering, masonry, and
            concrete mixtures.
          </li>
        </ul>

        <p>
          Using these tools together helps homeowners, builders, and contractors
          estimate materials more accurately before starting construction work.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          When Should You Use a Tile Calculator?
        </h2>

        <p>
          A tile calculator is useful whenever you are planning a flooring or
          wall tiling project and need to estimate how many tiles should be
          purchased.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Before purchasing tiles for a home renovation project</li>
          <li>While planning flooring for a new house</li>
          <li>Estimating tile requirements for bathrooms or kitchens</li>
          <li>Planning commercial flooring installations</li>
          <li>
            Calculating tile quantities for patios, balconies, or outdoor areas
          </li>
        </ul>

        <p>
          Using a tile calculator early in the planning stage helps avoid
          delays, material shortages, and unnecessary costs.
        </p>
      </section>
      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p>
          Below are some common questions people ask when estimating tile
          quantities for flooring or wall installation.
        </p>

        <p>
          <strong>How many extra tiles should I buy?</strong>
        </p>
        <p>
          Most professionals recommend adding about 10 to 15 percent extra tiles
          to account for cutting, breakage, and installation adjustments.
        </p>

        <p>
          <strong>Do larger tiles reduce the number of tiles required?</strong>
        </p>
        <p>
          Yes. Larger tiles cover more surface area, which means fewer tiles are
          needed to cover the same space compared to smaller tiles.
        </p>

        <p>
          <strong>Why is wastage important in tile estimation?</strong>
        </p>
        <p>
          During installation, some tiles must be cut to fit edges, corners, and
          irregular shapes. A few tiles may also break during handling, so
          adding extra tiles ensures the project can be completed without
          delays.
        </p>

        <p>
          <strong>Should I round up the tile quantity?</strong>
        </p>
        <p>
          Yes. It is always safer to round up the final tile estimate to ensure
          you have enough tiles available during installation.
        </p>

        <p>
          <strong>
            What happens if I run out of tiles during installation?
          </strong>
        </p>
        <p>
          You may need to purchase tiles from a different production batch,
          which can result in slight color or texture differences. This is why
          accurate estimation is important before starting the project.
        </p>

        <p>
          <strong>Do tile patterns affect tile quantity?</strong>
        </p>
        <p>
          Yes. Complex patterns such as diagonal or decorative layouts usually
          require more tile cutting and therefore increase the wastage
          percentage.
        </p>

        <p>
          <strong>Can this calculator be used for wall tiles?</strong>
        </p>
        <p>
          Yes. The tile calculator works for both floor and wall surfaces as
          long as you provide the correct measurements for the area and tile
          size.
        </p>

        <p>
          <strong>Is this calculator accurate for renovation projects?</strong>
        </p>
        <p>
          Yes. As long as the measurements entered are correct, the calculator
          provides a reliable estimate that can help plan tile purchases before
          renovation or construction begins.
        </p>
      </section>
      {/* ================= DISCLAIMER ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disclaimer</h2>

        <p>
          The results provided by this Tile Calculator are estimates intended
          for planning purposes only. Actual tile requirements may vary
          depending on installation methods, tile layout patterns, cutting
          requirements, and on-site conditions.
        </p>

        <p>
          While this tool helps estimate tile quantities based on the
          measurements entered, it should not replace professional advice from
          contractors, architects, or construction specialists.
        </p>

        <p>
          Always verify measurements and consult with a qualified professional
          before purchasing construction materials for large projects.
        </p>
      </section>
    </article>
  );
};

export default TileCalculatorArticle;
